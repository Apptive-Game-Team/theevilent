# 2화 웹페이지와 읽기 기록

PR 검토용 변경이며 병합·운영 배포는 하지 않는다.

- 한국어 경로: /arcane-casters/comic/2/ko
- 영어 경로: /arcane-casters/comic/2/en
- 10장 선택 원화는 selected-pages.json을 따른다. 1·2장의 미라 도입과 8장의 기록 중단을 포함하고, 7·9장은 전면 그림이다.
- 공개 파일은 public/arcane-casters/comic/002/의 한영 WebP와 표지다. 비공개 설정과 이전 시안은 공개 자산으로 복사하지 않는다.
- 영어판은 같은 원화의 말풍선 안에 글자만 합성했다. lettering-en.json이 balloon-candidates.json의 영역과 연결된다. lettering-verification.json에 말풍선 밖 픽셀 보존 결과를 저장한다.
- 효과음 ‘쾅’은 원화에 남기고 영어 접근성 텍스트에는 ‘Sound: BOOM.’을 제공한다.
- tools/export-comic.py로 선택 원화와 번역에서 공개 자산을 재생성한다. Pillow와 Windows의 comicbd.ttf를 사용하며 폰트 파일은 배포하지 않는다.
- 페이지 제목·설명·공유 정보는 src/content/comic-episodes.json, 장별 설명은 src/content/comic-pages-002.json에 있다.
- 회차 선택과 마지막의 회차 링크는 현재 언어를 유지한다. 언어 링크와 SNS 공유도 현재 회차를 유지한다.
- 브라우저 localStorage의 arcane-casters:comic-reading:v1에 회차별 마지막 읽기 위치와 완독 여부만 저장한다. 한영판은 기록을 공유한다. 계정이나 서버에 보내지 않으며 다른 브라우저와 동기화하지 않는다.
- 마지막 장 아래에 도달하면 완독으로 표시한다. 회차를 열기만 해서는 완독이 되지 않는다. 브라우저 저장소가 차단되거나 손상되어도 만화는 계속 읽을 수 있다.
- 1·2화의 정적 HTML 모두 noindex, noimageindex와 회차별 OG/X 공유 정보를 유지한다.

검증은 빌드·린트, 저장소 검증 스크립트 전체 Playwright와 tests/comic-reading.spec.ts의 회차·기록 검사를 사용한다. 계정과 랭킹은 기존 로컬 fixture 검증이며 운영 환경 검증을 뜻하지 않는다.
