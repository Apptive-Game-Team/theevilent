import json
from pathlib import Path
from html import escape
from PIL import Image, ImageOps, ImageDraw

here = Path(__file__).resolve().parent
episodes_root = here.parent
data = json.loads((here / "production.json").read_text(encoding="utf-8"))
total = 0
for episode, pages in data["episodes"].items():
    root = episodes_root / episode.zfill(3)
    manifest = json.loads((root / "selected-pages.json").read_text(encoding="utf-8"))
    ready = []
    for index, page in enumerate(manifest["pages"]):
        number = index + 1
        stem = f"page-{number:02}"
        # 검토 화면을 다시 만들 때 선택된 원화를 이전 버전으로 바꾸지 않는다.
        selected = root / page["src"] if page.get("src") else None
        source = selected if selected and selected.is_file() else None
        page["title"] = pages[index][0]
        page["dialogue"] = pages[index][2]
        if source is None:
            page["status"] = "pending"
            continue
        with Image.open(source) as im:
            assert im.size == (1024, 1536), (source, im.size)
            im.verify()
        page["src"] = source.relative_to(root).as_posix()
        assert (root / page["prompt"]).is_file(), page["prompt"]
        if page["status"] == "pending":
            page["status"] = "drawn-awaiting-review"
        ready.append(page)
    manifest["status"] = "continuity-review-required" if (here / "PRODUCTION-HOLD.md").exists() else ("draft-drawn" if len(ready) == len(pages) else "in-progress")
    manifest["readyPages"] = len(ready)
    (root / "selected-pages.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    common = "미라는 보고 직후 쉬지 않고 물 슬라임 마을로 바로 출발한다. 소환과 진지 구축 장면에 미라는 없다. 세계수의 소환수는 정령을 도우며 탑으로 대피시킨다. 대포와 전기 타워를 얹은 큰 돌 골렘, 포탑등이, 비전 보병, 마법사들이 빽빽하게 탑을 지킨다. 잠식으로 내부 붕괴가 일어나고, 물 슬라임 합류로 반격한 뒤 핀이 등장한다."
    plan = f"# {episode}화 작화 구성\n\n2026-10-30 최신 사용자 수정 반영.\n\n{common}\n\n"
    for index, page in enumerate(pages):
        plan += f"## {index + 1}. {page[0]}\n\n{page[1]}\n\n인쇄 대사: " + (" / ".join(page[2]) or "없음") + "\n\n"
    plan += "## 제작과 공개\n\n원화와 정확한 프롬프트는 selected-pages.json 기준이다. PR에서 초안을 검토하며 사이트 게시와 배포는 별도다. 물에 의한 잠식 해제나 마법사의 면역은 확정하지 않는다.\n"
    (root / "PLAN.md").write_text(plan, encoding="utf-8")
    figures = "".join(f'<figure><figcaption>{p["number"]}. {escape(p["title"])}</figcaption><img src="{escape(p["src"], quote=True)}" loading="lazy" width="1024" height="1536"></figure>' for p in ready)
    style = "body{margin:0;background:#102335;color:#eef3f8;font-family:system-ui,sans-serif}header,main{max-width:900px;margin:auto}header{padding:24px 16px}figure{margin:0 0 22px}figcaption{padding:10px 16px}img{display:block;width:100%;height:auto}a{color:#9bdcff}"
    html = f'<!doctype html><html lang="ko"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,noimageindex"><title>{episode}화 검토</title><style>{style}</style><header><h1>{episode}화 작화 검토</h1><p>{len(ready)}/{len(pages)}장 · 최종 승인 전 원고</p><a href="../tower-defense-production/index.html">전체 회차</a></header><main>{figures}</main></html>'
    (root / "index.html").write_text(html, encoding="utf-8")
    (root / "WORK-STATUS.md").write_text(f"# {episode}화 작화 상태\n\n선택 작화 {len(ready)}/{len(pages)}장. 공간 연속성 미승인 초안. 사용자 최종 승인을 뜻하지 않는다.\n\n사용자 요청으로 공간 교정을 재개했다. ../tower-defense-production/PRODUCTION-HOLD.md의 작업 재개 항목을 따른다.\n\n{common}\n\nPR 검토용 초안이며 사이트 게시와 배포는 수행하지 않는다.\n", encoding="utf-8")
    if ready:
        thumb_w, thumb_h, label_h = 256, 384, 28
        sheet = Image.new("RGB", (thumb_w * 4, (thumb_h + label_h) * ((len(ready)+3)//4)), "#102335")
        draw = ImageDraw.Draw(sheet)
        for i,p in enumerate(ready):
            with Image.open(root / p["src"]) as im:
                thumb = ImageOps.contain(im.convert("RGB"), (thumb_w, thumb_h))
                x,y = (i%4)*thumb_w,(i//4)*(thumb_h+label_h)
                sheet.paste(thumb,(x,y+label_h))
                draw.text((x+8,y+6),f"{episode}-{p['number']:02}",fill="white")
        sheet.save(root / "contact-sheet.jpg", quality=90)
    total += len(ready)
    print(f"Episode {episode}: {len(ready)}/{len(pages)} pages")
links = "".join(f'<li><a href="../{ep.zfill(3)}/index.html">{ep}화 · {len(pages)}장</a></li>' for ep,pages in data["episodes"].items())
(here / "index.html").write_text(f'<!doctype html><html lang="ko"><meta charset="utf-8"><meta name="robots" content="noindex"><title>탑 방어전 원고 검토</title><style>{style}</style><header><h1>5~7화 탑 방어전 원고</h1><p>{total}/40장 · 검토용</p><ul>{links}</ul><p>미라는 보고 직후 쉬지 않고 물 슬라임 마을로 출발합니다.</p></header></html>', encoding="utf-8")
print(f"Total: {total}/40 pages")
