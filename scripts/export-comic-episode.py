"""선택 원고를 사이트용 WebP로 내보내고 원본과의 대응을 기록한다."""
import argparse
import hashlib
import json
from pathlib import Path

from PIL import Image, ImageChops


def digest(file):
    return hashlib.sha256(file.read_bytes()).hexdigest()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("episode", type=int)
    parser.add_argument("--locale", choices=("ko", "en"), default="ko")
    parser.add_argument("--manifest", default="selected-pages.json")
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()
    if args.episode < 1:
        parser.error("회차 번호는 1 이상이어야 합니다.")
    repo = Path(__file__).resolve().parents[1]
    root = repo / "content/arcane-casters/story/episodes" / f"{args.episode:03}"
    manifest = (root / args.manifest).resolve()
    if not manifest.is_relative_to(root.resolve()):
        parser.error("선택 목록은 해당 회차 폴더 안에 있어야 합니다.")
    selected = json.loads(manifest.read_text(encoding="utf-8-sig"))
    if selected.get("locale", "ko") != args.locale:
        parser.error("요청 언어의 선택 원고 목록을 --manifest로 지정해 주세요. 한국어 원고를 영어판으로 복사하지 않습니다.")
    pages = selected["pages"]
    if not pages or len(pages) != selected.get("plannedPages", len(pages)):
        parser.error("계획한 전체 페이지가 선택되지 않았습니다.")
    sources = []
    for number, page in enumerate(pages, 1):
        if page["number"] != number or page.get("status") == "pending" or not page.get("src"):
            parser.error(f"선택 원고의 번호 또는 제작 상태를 확인해 주세요: {number}")
        source = (root / page["src"]).resolve()
        if not source.is_relative_to(root.resolve()):
            parser.error(f"회차 밖의 원화를 내보낼 수 없습니다: {source.name}")
        with Image.open(source) as image:
            if image.size != (1024, 1536):
                parser.error(f"원화 크기를 확인해 주세요: {source.name} {image.size}")
            image.verify()
        sources.append(source)
    output = repo / "public/arcane-casters/comic" / f"{args.episode:03}"
    report_path = root / f"publication-{args.locale}.json"
    if args.check:
        report = json.loads(report_path.read_text(encoding="utf-8"))
        if report["locale"] != args.locale or len(report["pages"]) != len(pages):
            raise ValueError("게시 기록의 언어와 쪽수가 선택 목록과 다릅니다.")
        for page, source, record in zip(pages, sources, report["pages"], strict=True):
            asset = output / args.locale / f"page-{page['number']:02}.webp"
            if record["number"] != page["number"] or record["source"] != source.relative_to(root).as_posix():
                raise ValueError(f"선택 원고가 바뀌었습니다: {page['number']}")
            if digest(source) != record["sourceSha256"] or digest(asset) != record["assetSha256"]:
                raise ValueError(f"원화 또는 게시 이미지가 바뀌었습니다: {page['number']}")
            with Image.open(source) as original, Image.open(asset) as delivered:
                if delivered.size != original.size or ImageChops.difference(original.convert("RGB"), delivered.convert("RGB")).getbbox():
                    raise ValueError(f"게시 이미지가 선택 원화와 다릅니다: {page['number']}")
        if digest(output / "cover.webp") != report["cover"]["sha256"]:
            raise ValueError("표지가 게시 기록과 다릅니다.")
        print(f"Verified episode {args.episode}/{args.locale}: {len(pages)} source-matched pages and cover")
        return
    (output / args.locale).mkdir(parents=True, exist_ok=True)
    records = []
    for page, source in zip(pages, sources, strict=True):
        asset = output / args.locale / f"page-{page['number']:02}.webp"
        with Image.open(source) as original:
            original.convert("RGB").save(asset, lossless=True, method=6)
        records.append({"number": page["number"], "source": source.relative_to(root).as_posix(),
                        "sourceSha256": digest(source), "asset": asset.relative_to(repo / "public").as_posix(),
                        "assetSha256": digest(asset), "width": 1024, "height": 1536})
        print(f"Exported {args.episode}/{args.locale}/{page['number']}", flush=True)
    cover = output / "cover.webp"
    if args.locale == "ko" or not cover.exists():
        with Image.open(sources[0]) as image:
            image.convert("RGB").crop((0, 0, 1024, 538)).save(cover, lossless=True, method=6)
    report_path.write_text(json.dumps({"episode": args.episode, "locale": args.locale,
        "manifest": manifest.relative_to(root).as_posix(), "pages": records,
        "cover": {"asset": cover.relative_to(repo / "public").as_posix(), "sha256": digest(cover)}},
        ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Exported episode {args.episode}/{args.locale}: {len(pages)} pages")


if __name__ == "__main__":
    main()
