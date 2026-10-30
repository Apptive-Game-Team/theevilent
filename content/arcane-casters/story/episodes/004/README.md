# 4화 · 소리가 멎은 뒤

[검토 화면](index.html)을 브라우저에서 열면 선택 원고 12장을 순서대로 읽을 수 있다. 한국어·영어 읽기 화면도 PR 검토용으로 추가했다. 병합·운영 배포는 보류한다.

- [제작 구성](PLAN.md): 승인한 사건과 장별 흐름, 제작 중 최신 수정.
- [현재 선택](selected-pages.json): 원고·프롬프트·대사·검수 상태의 기준.
- [검수 기록](REVIEW.md), [참고 역할](REFERENCES.md).

art-v1/에는 최초 원본, art-v2/에는 수정본이 있다. 폴더 전체를 회차 원고로 사용하지 말고 현재 선택 목록을 따른다. prompts-v1/·prompts-v2/에는 내장 imagegen에 전달한 정확한 요청문을 보관한다. PLAN-proposal.md는 승인 전 제안 기록이다.

검토 화면 재생성에는 Python 3와 Pillow가 필요하다. 이 폴더에서 실행한다.

```sh
python build-reader.py
```

이 도구는 이미지와 프롬프트 파일을 확인하고 검토 화면을 만든다. 자동 파일 검사가 시각 검수를 대신하거나 사용자 승인을 뜻하지 않는다.

웹페이지 자산은 `python tools/export-comic.py`로 재생성한다. 같은 원화에서 말풍선 글자만 바꾸며, 말풍선 밖 픽셀 보존 결과를 lettering-verification.json에 기록한다. 로컬 Windows의 comicbd.ttf를 사용하며 폰트 파일은 배포하지 않는다.
