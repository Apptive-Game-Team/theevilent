import json
from pathlib import Path
from html import escape

root = Path(__file__).resolve().parent
data = json.loads((root / 'selected-pages.json').read_text(encoding='utf-8'))
pages = data['pages']
assert [p['number'] for p in pages] == list(range(1, len(pages) + 1))
for page in pages:
    if not (root / page['src']).is_file():
        raise FileNotFoundError(page['src'])
figures = ''.join(
    '<figure><img src="' + escape(page['src'], quote=True)
    + '" alt="' + escape(page['title'], quote=True)
    + '" width="1024" height="1536" loading="'
    + ('eager' if page['number'] == 1 else 'lazy') + '"></figure>'
    for page in pages
)
html = '''<!doctype html><html lang="ko"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,noimageindex"><title>2화 · 검토용</title>
<style>
*{box-sizing:border-box}html{background:#0d2238;color:#eef3f8;font-family:system-ui,sans-serif}
body{margin:0}header{max-width:900px;margin:auto;padding:24px 16px;display:flex;gap:20px;align-items:center}
h1{font-size:20px;margin:0}header a{color:#d6e0ee;font-size:14px}main{max-width:900px;margin:auto}
figure{margin:0 0 12px}img{display:block;width:100%;height:auto}a:focus-visible{outline:3px solid #ff9a1c}
</style></head><body><header><h1>2화 · 검토용</h1>
</header><main>''' + figures + '</main></body></html>'
(root / 'index.html').write_text(html, encoding='utf-8')
print(f'Reader ready: {len(pages)} selected pages, including two full-page illustrations.')
