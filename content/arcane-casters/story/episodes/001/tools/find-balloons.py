import json
from pathlib import Path
from collections import deque
from PIL import Image, ImageDraw

root = Path(__file__).resolve().parents[1]
pages = json.loads((root / 'selected-pages.json').read_text(encoding='utf-8'))['pages']
found = []
sheet = Image.new('RGB', (1600, 2400), '#777777')
for page in pages:
    source = root / page['src']
    if not source.exists():
        source = root.parents[4] / 'public/arcane-casters/comic/001/ko' / f"page-{page['number']:02}.webp"
    original = Image.open(source).convert('RGB')
    small = original.resize((512, 768))
    pixels = small.load()
    white = bytearray(512 * 768)
    for y in range(768):
        for x in range(512):
            rgb = pixels[x, y]
            white[y * 512 + x] = int(min(rgb) > 234 and max(rgb) - min(rgb) < 18)
    regions = []
    for pos in range(len(white)):
        if not white[pos]:
            continue
        white[pos] = 0
        q = deque([pos])
        xs, ys, count = [], [], 0
        while q:
            p = q.popleft()
            y, x = divmod(p, 512)
            xs.append(x)
            ys.append(y)
            count += 1
            for nxt in (p - 512 if y else -1, p + 512 if y < 767 else -1, p - 1 if x else -1, p + 1 if x < 511 else -1):
                if nxt >= 0 and white[nxt]:
                    white[nxt] = 0
                    q.append(nxt)
        if count < 350:
            continue
        x0, y0, x1, y1 = min(xs), min(ys), max(xs), max(ys)
        w, h = x1 - x0, y1 - y0
        if 22 < w < 360 and 14 < h < 180 and count / ((w + 1) * (h + 1)) > .30:
            regions.append([x0 * 2, y0 * 2, (x1 + 1) * 2, (y1 + 1) * 2])
    regions.sort(key=lambda r: (r[1] // 70, r[0]))
    draw = ImageDraw.Draw(original)
    for i, box in enumerate(regions):
        draw.rectangle(box, outline='#ee0055', width=3)
        draw.text((box[0], box[1]), str(i), fill='#ff0055', stroke_width=1)
    tile = original.resize((320, 480))
    ImageDraw.Draw(tile).text((8, 8), str(page['number']), fill='white', stroke_width=2, stroke_fill='black')
    index = page['number'] - 1
    sheet.paste(tile, ((index % 5) * 320, (index // 5) * 600))
    found.append({'number': page['number'], 'regions': regions})
(root / 'balloon-candidates.json').write_text(json.dumps(found, indent=2), encoding='utf-8')
sheet.save(root / 'balloon-contact-sheet.jpg')
