import argparse
import json
from pathlib import Path
from PIL import Image

parser = argparse.ArgumentParser()
parser.add_argument('--reviewed', nargs='*', type=int, default=[])
args = parser.parse_args()
root = Path(__file__).resolve().parent
selection = root / 'selected-pages.json'
data = json.loads(selection.read_text(encoding='utf-8'))
for page in data['pages']:
    number = page['number']
    if number == 4:
        page['dialogue'] = ['공격해라.', '핀. 내 말 들려?']
        page['actingNote'] = '검붉은 바탕·밝은 글자·꼬리 없는 닫힌 말풍선. 핀의 시선과 몸짓은 군단을 향한다.'
    if number == 9:
        page['dialogue'] = ['멈추지 마라.']
        page['actingNote'] = '핀의 말처럼 보이지만 원래 의지로 확정하지 않는다.'
    if number == 12:
        page['dialogue'] = ['어떤 일이지!?', '핀이… 저를 공격했습니다.', '왜…?']
    image_path = root / page['src']
    assert (root / page['prompt']).is_file()
    if not image_path.is_file():
        page['status'] = 'pending'
        continue
    with Image.open(image_path) as image:
        assert image.size == (1024, 1536), (number, image.size)
        image.verify()
    page['status'] = 'draft-reviewed' if number in args.reviewed or page['status'] == 'draft-reviewed' else 'drawn'
data['status'] = 'draft-complete' if all(page['status'] == 'draft-reviewed' for page in data['pages']) else 'in-progress'
selection.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(data['status'])
