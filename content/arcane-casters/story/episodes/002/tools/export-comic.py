"""선택 원화를 내보내고 말풍선 안쪽 글자만 영어로 교체한다."""
import json
from pathlib import Path
from collections import deque
from PIL import Image, ImageDraw, ImageFont, ImageChops

root = Path(__file__).resolve().parents[1]
website = root.parents[4]
output = website / 'public/arcane-casters/comic/002'
selected = json.loads((root / 'selected-pages.json').read_text(encoding='utf-8'))['pages']
regions = json.loads((root / 'balloon-candidates.json').read_text(encoding='utf-8'))
lettering = json.loads((root / 'lettering-en.json').read_text(encoding='utf-8'))
font_path = Path('C:/Windows/Fonts/comicbd.ttf')
verification = []
for lang in ('ko', 'en'):
    (output / lang).mkdir(parents=True, exist_ok=True)

def interior_mask(image, box):
    # 연결된 흰 영역을 찾고 그 안에 둘러싸인 글자 구멍만 채운다.
    x0, y0, x1, y1 = box
    w, h = x1 - x0, y1 - y0
    crop = image.crop(box).convert('RGB')
    mask = Image.new('L', (w, h))
    pixels, marks = crop.load(), mask.load()
    seeds = [(x, y) for y in range(h) for x in range(w) if min(pixels[x, y]) > 234 and max(pixels[x, y]) - min(pixels[x, y]) < 18]
    # 글자 내부의 작은 흰 구멍 대신 가장 큰 흰 영역을 고른다.
    unseen = set(seeds)
    largest = []
    while unseen:
        seed = unseen.pop()
        queue, component = deque([seed]), [seed]
        while queue:
            x,y = queue.popleft()
            for neighbor in ((x-1,y),(x+1,y),(x,y-1),(x,y+1)):
                if neighbor in unseen:
                    unseen.remove(neighbor)
                    component.append(neighbor)
                    queue.append(neighbor)
        if len(component) > len(largest):
            largest = component
    for x,y in largest:
        marks[x,y] = 255
    # 말풍선 외곽선과 꼬리를 넘지 않고 내부 구멍만 채운다.
    outside = Image.new('L', (w+2,h+2), 0)
    outside.paste(mask, (1,1))
    ImageDraw.floodfill(outside, (0,0), 128)
    filled = outside.point(lambda v: 0 if v == 128 else 255).crop((1,1,w+1,h+1))
    return filled

def wrapped(draw, text, font, width):
    lines, current = [], ''
    for word in text.split():
        proposal = (current + ' ' + word).strip()
        if current and draw.textlength(proposal, font=font) > width:
            lines.append(current)
            current = word
        else:
            current = proposal
    if current:
        lines.append(current)
    return lines

for page, candidates, translations in zip(selected, regions, lettering):
    source_path = root / page['src']
    if not source_path.exists():
        source_path = output / 'ko' / f"page-{page['number']:02}.webp"
    source = Image.open(source_path).convert('RGB')
    result = source.copy()
    total_mask = Image.new('L', source.size)
    draw = ImageDraw.Draw(result)
    for item in translations['balloons']:
        box = candidates['regions'][item['region']]
        mask = interior_mask(source, box)
        result.paste('#fdfdfd', box, mask)
        union = ImageChops.lighter(total_mask.crop(box), mask)
        total_mask.paste(union, box)
        x0,y0,x1,y1 = box
        width, height = (x1-x0)*.78, (y1-y0)*.70
        for size in range(28, 11, -1):
            font = ImageFont.truetype(str(font_path), size)
            lines = wrapped(draw, item['text'], font, width)
            line_height = size * 1.18
            if len(lines)*line_height > height:
                continue
            ink = Image.new('L', (x1-x0,y1-y0))
            ink_draw = ImageDraw.Draw(ink)
            center_x, center_y = (x1-x0)/2, (y1-y0)/2 - 3
            top = center_y - len(lines)*line_height/2
            for index, line in enumerate(lines):
                ink_draw.text((center_x,top+index*line_height),line,font=font,fill=255,anchor='mt')
            if not ImageChops.multiply(ink, ImageChops.invert(mask)).getbbox():
                break
        else:
            raise ValueError(f"Lettering does not fit: page {page['number']} {item['text']}")
        result.paste('#111111',box,ink)
    diff = ImageChops.difference(source, result).convert('L')
    outside_diff = ImageChops.multiply(diff, ImageChops.invert(total_mask))
    if outside_diff.getbbox():
        raise ValueError(f"Artwork outside lettering masks changed: page {page['number']}")
    name = f"page-{page['number']:02}.webp"
    source.save(output / 'ko' / name, lossless=True, method=6)
    result.save(output / 'en' / name, lossless=True, method=6)
    verification.append({'page':page['number'],'artOutsideBalloonsUnchanged':True,'balloons':len(translations['balloons'])})
    if page['number'] == 1:
        # 첫 장의 기존 전경을 잘라 공유 표지로 사용한다.
        source.crop((0,0,1024,538)).save(output / 'cover.webp', lossless=True, method=6)
(root / 'lettering-verification.json').write_text(json.dumps(verification,indent=2),encoding='utf-8')
print(f"Exported {len(selected)} pages in both languages to {output}")
