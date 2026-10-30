import json
from html import escape
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parent
selection = root / 'selected-pages.json'
data = json.loads(selection.read_text(encoding='utf-8'))
assert [p['number'] for p in data['pages']] == list(range(1, 13))
ready = []
for page in data['pages']:
    assert (root / page['prompt']).is_file()
    source = root / page['src']
    if not source.is_file():
        page['status'] = 'pending'
        continue
    with Image.open(source) as artwork:
        assert artwork.size == (1024, 1536), (page['number'], artwork.size)
        artwork.verify()
    if page['status'] == 'pending':
        page['status'] = 'drawn'
    ready.append(page)
data['status'] = 'draft-complete' if len(ready) == 12 and all(p['status'] == 'draft-reviewed' for p in ready) else 'in-progress'
selection.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
figures = ''.join('<figure><img src="' + escape(page['src'], quote=True) + '" alt="' + escape(page['title'], quote=True) + '" width="1024" height="1536" loading="' + ('eager' if index == 0 else 'lazy') + '"></figure>' for index, page in enumerate(ready))
html = '''<!doctype html><html lang="ko"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,noimageindex"><title>4화 · 검토용</title>
<style>*{box-sizing:border-box}html{background:#0d2238;color:#eef3f8;font-family:system-ui,sans-serif}body{margin:0}header{max-width:900px;margin:auto;padding:24px 16px}h1{font-size:20px;margin:0}main{max-width:900px;margin:auto}figure{margin:0 0 12px}img{display:block;width:100%;height:auto}</style>
</head><body><header><h1>4화 · 검토용</h1></header><main>''' + figures + '</main></body></html>'
(root / 'index.html').write_text(html, encoding='utf-8')
status = '# 4화 작화 상태\n\n' + f'선택 작화 {len(ready)}/12장. 사용자 최종 승인을 뜻하지 않는다.\n\n'
status += '선택 이미지·정확한 프롬프트·검수 상태는 selected-pages.json을 따른다. 3장은 전면 그림이다.\n'
status += '4화는 2화 차원문 개방 직후로 돌아가며, 핀의 잠식 뒤 3화의 공중 기습 직전까지 이어진다.\n'
status += '한영 웹페이지와 회차 연결을 PR 검토용으로 추가한다. 병합·운영 배포는 보류한다.\n'
(root / 'WORK-STATUS.md').write_text(status, encoding='utf-8')
print(f'Reader ready: {len(ready)}/12 pages; {data["status"]}.')
