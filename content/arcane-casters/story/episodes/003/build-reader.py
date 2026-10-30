import json
from html import escape
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parent
selection = root / 'selected-pages.json'
data = json.loads(selection.read_text(encoding='utf-8'))
pages = data['pages']
assert [page['number'] for page in pages] == list(range(1, len(pages) + 1))
ready = []
for page in pages:
    path = root / page['src']
    if not path.is_file():
        continue
    with Image.open(path) as artwork:
        if artwork.size != (1024, 1536):
            raise ValueError(f"Unexpected canvas: {page['number']} {artwork.size}")
        artwork.verify()
    ready.append(page)
figures = ''.join(
    '<figure><img src="' + escape(page['src'], quote=True)
    + '" alt="' + escape(page['title'], quote=True)
    + '" width="1024" height="1536" loading="'
    + ('eager' if index == 0 else 'lazy') + '"></figure>'
    for index, page in enumerate(ready)
)
html = '''<!doctype html><html lang="ko"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,noimageindex"><title>3화 · 검토용</title>
<style>
*{box-sizing:border-box}html{background:#0d2238;color:#eef3f8;font-family:system-ui,sans-serif}
body{margin:0}header{max-width:900px;margin:auto;padding:24px 16px}
h1{font-size:20px;margin:0}main{max-width:900px;margin:auto}
figure{margin:0 0 12px}img{display:block;width:100%;height:auto}
</style></head><body><header><h1>3화 · 검토용</h1></header><main>''' + figures + '</main></body></html>'
(root / 'index.html').write_text(html, encoding='utf-8')
status = '# 3화 작화 상태\n\n'
status += f'선택 작화 {len(ready)}/{len(pages)}장. 사용자 최종 승인을 뜻하지 않는다.\n\n'
status += '완성 파일: ' + ', '.join(str(page['number']) for page in ready) + '\n\n'
status += '그림·프롬프트·검수 상태는 selected-pages.json을 따른다. 6·8장은 전면 그림이다.\n'
status += '1~2장에서 핀을 숨기고 3장에서 처음 공개한다. 핀 옆에 군단이 밀집하며 명령은 그의 지시처럼 보인다. 미라는 정상적인 검은 눈이다.\n'
status += '로컬 검토본과 한영 웹페이지를 PR 검토용으로 추가했다. 병합·운영 배포는 보류한다.\n'
(root / 'WORK-STATUS.md').write_text(status, encoding='utf-8')
print(f'Reader ready: {len(ready)}/{len(pages)} pages.')
