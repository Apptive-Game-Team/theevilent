import argparse
import json
from pathlib import Path
from PIL import Image

parser = argparse.ArgumentParser()
parser.add_argument('--reviewed', nargs='*', type=int, default=[])
args = parser.parse_args()
root = Path(__file__).resolve().parent
path = root / 'selected-pages.json'
data = json.loads(path.read_text(encoding='utf-8'))
reviewed = set(args.reviewed)
total = len(data['pages'])
for page in data['pages']:
    image_path = root / page['src']
    if not image_path.exists():
        page['status'] = 'pending'
        continue
    with Image.open(image_path) as image:
        if image.size != (1024, 1536):
            raise ValueError(f"Unexpected canvas on page {page['number']}: {image.size}")
        image.verify()
    page['status'] = 'draft-reviewed' if page['number'] in reviewed or page['status'] == 'draft-reviewed' else 'drawn'
done = [p['number'] for p in data['pages'] if p['status'] != 'pending']
checked = [p['number'] for p in data['pages'] if p['status'] == 'draft-reviewed']
splashes = [str(p['number']) for p in data['pages'] if p.get('fullPage')]
data['status'] = 'draft-complete' if len(checked) == total else 'in-progress'
path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
status = (
    '# 2화 작화 상태\n\n'
    + f"선택 작화 {len(done)}/{total}장, 작화 점검 {len(checked)}/{total}장. 사용자 최종 승인을 뜻하지 않는다.\n\n"
    + '완성 파일: ' + ', '.join(map(str, sorted(done))) + '\n\n'
    + f'현재 {total}장 구성이다. 미라의 도착·정령 관찰 뒤 핀의 사건으로 전환한다. 핀은 모크와 떨어져 멀리서 따라간다.\n'
    + '전면 그림은 ' + '·'.join(splashes) + '장이다. 군단과 먼 사악한 기운은 분할·삽입 컷·글자 없이 보여준다.\n'
    + '군단은 기존 검정·진홍 갑각과 주황빛 발광을 유지하며 군집형 포식자·중장갑 괴수·날개 악마·괴수 기병·기존 부유형을 섞는다.\n'
    + '현재 선택 원화와 프롬프트는 selected-pages.json을 따른다. art-v1/은 폐기한 느린 전개 시안이다.\n'
    + '사이트에 게시하지 않는다. 전체 작화 점검 후 build-reader.py로 index.html을 만든다.\n'
)
(root / 'WORK-STATUS.md').write_text(status, encoding='utf-8')
print(f"Drawn {len(done)}/{total}; checked {len(checked)}/{total}")
