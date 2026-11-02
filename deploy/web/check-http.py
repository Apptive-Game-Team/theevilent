import json
import pathlib
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

base, directory = sys.argv[1:]
public = pathlib.Path(directory)


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *args, **kwargs):
        return None


opener = urllib.request.build_opener(NoRedirect)


def request(path):
    try:
        return opener.open(base + path, timeout=10)
    except urllib.error.HTTPError as error:
        return error


for attempt in range(30):
    try:
        if request("/").status == 200:
            break
    except OSError:
        pass
    time.sleep(1)
else:
    raise RuntimeError("Nginx가 시작되지 않았습니다.")

index = public.joinpath("index.html").read_bytes()
for path in ("/", "/team", "/arcane-casters/magic"):
    response = request(path)
    assert response.status == 200, path
    assert response.read() == index, path
    assert response.headers.get("Cache-Control") == "no-cache", path

vercel = json.loads(pathlib.Path("vercel.json").read_text(encoding="utf-8"))
for redirect in vercel["redirects"]:
    response = request(redirect["source"])
    assert response.status == (308 if redirect["permanent"] else 307), redirect
    assert urllib.parse.urlparse(response.headers["Location"]).path == redirect["destination"], redirect
    assert response.headers.get("X-Robots-Tag") == "noindex, noimageindex", redirect

for rewrite in vercel["rewrites"]:
    if rewrite["source"] == "/(.*)":
        continue
    response = request(rewrite["source"])
    assert response.status == 200, rewrite
    assert response.read() == public.joinpath(rewrite["destination"].lstrip("/")).read_bytes(), rewrite
    assert response.headers.get("X-Robots-Tag") == "noindex, noimageindex", rewrite

for path in ("/arcane-casters/comic/5/en", "/arcane-casters/comic/ko?source=check"):
    response = request(path)
    assert response.status == 200, path
    assert response.headers.get("X-Robots-Tag") == "noindex, noimageindex", path

for pattern, mime in (("assets/*.js", "application/javascript"), ("arcane-casters/comic/**/*.webp", "image/webp")):
    file = next(public.glob(pattern))
    response = request("/" + file.relative_to(public).as_posix())
    assert response.status == 200, file
    assert response.headers.get_content_type() == mime, file
    assert response.read() == file.read_bytes(), file

for path in ("/assets/missing.js", "/arcane-casters/comic/missing.webp", "/.git/config", "/.env"):
    assert request(path).status == 404, path
print("홈페이지 Nginx HTTP 검사 통과")
