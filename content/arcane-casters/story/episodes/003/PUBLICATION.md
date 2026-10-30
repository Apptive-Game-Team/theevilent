# 3화 웹페이지

PR #112에서 원고만 포함해 웹사이트에서 읽을 수 없었던 누락을 수정한다. 병합·운영 배포는 보류한다.

- 한국어: /arcane-casters/comic/3/ko
- 영어: /arcane-casters/comic/3/en
- 회차 목록에 3화 썸네일을 추가하고 2화의 다음화와 3화의 이전화를 연결한다.
- 브라우저 읽기 위치·완독 기록·언어 전환·공유 주소는 기존 회차별 기능을 사용한다.
- selected-pages.json의 12장을 사용한다. 4·9장의 머릿속 명령은 검붉은 바탕과 찌직거리는 불규칙한 테두리를 유지하며 발화자 꼬리가 없다.
- 영어판은 같은 원화의 말풍선 안 글자만 바꾼다. tools/export-comic.py가 한영 lossless WebP와 표지를 만들고, lettering-verification.json에 말풍선 밖 픽셀 보존 결과를 기록한다. 폰트는 로컬 Windows comicbd.ttf를 사용하며 폰트 파일은 배포하지 않는다.
- 공개 자산은 public/arcane-casters/comic/003/에, 회차와 장별 메타데이터는 src/content/comic-episodes.json 및 comic-pages-003.json에 둔다.
- 기존과 같이 noindex·noimageindex 및 한영 OG/X 메타데이터를 생성한다. 배후 설정과 미채택 원고는 공개 자산에 넣지 않는다.

검증에는 빌드·린트·기존 Playwright 전체 검사와 3화 목록 진입·12장 자산·다음화·언어 전환·읽기 기록·공유 주소 검사를 사용한다. 로컬 검증이며 운영 배포 확인을 뜻하지 않는다.
