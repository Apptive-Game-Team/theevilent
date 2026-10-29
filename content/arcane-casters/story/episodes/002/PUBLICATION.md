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
- 만화 목록은 /arcane-casters/comic/ko와 /arcane-casters/comic/en이다. 메뉴·푸터의 만화 링크는 목록을 연다.
- 목록에는 회차별 썸네일·제목·읽기 전/읽는 중/읽음 상태를 보여준다. 읽던 회차가 있으면 최근 읽기 기록을 기준으로 이어읽기 링크를 제공한다. 이전 형식의 기록도 그대로 읽는다.
- 읽기 화면에서는 상단의 회차 목록 링크와 하단의 이전화·목록·다음화로 이동한다. 본문 위 회차 버튼 목록과 중복 표지는 제거한다. 언어 링크·회차 이동·SNS 공유는 현재 언어와 회차를 유지한다.
- 언어 선택은 공통 상단 버튼 하나만 사용한다. 목록과 본문의 중복 한영 버튼은 제거하며 상단에서 언어를 바꾸어도 현재 목록 또는 회차와 주소의 읽기 위치를 유지한다.
- 브라우저 localStorage의 arcane-casters:comic-reading:v1에 회차별 마지막 읽기 위치·완독 여부·기록 시각을 저장한다. 한영판은 기록을 공유한다. 계정이나 서버에 보내지 않으며 다른 브라우저와 동기화하지 않는다.
- 마지막 장 아래에 도달하면 완독으로 표시한다. 회차를 열기만 해서는 완독이 되지 않는다. 브라우저 저장소가 차단되거나 손상되어도 만화는 계속 읽을 수 있다.
- 1·2화의 정적 HTML 모두 noindex, noimageindex와 회차별 OG/X 공유 정보를 유지한다.

검증은 빌드·린트, 저장소 검증 스크립트 전체 Playwright와 tests/comic-reading.spec.ts의 회차·기록 검사를 사용한다. 계정과 랭킹은 기존 로컬 fixture 검증이며 운영 환경 검증을 뜻하지 않는다.
