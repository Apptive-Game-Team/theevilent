# 1화 한영 웹 게시

- 한국어: https://theevilent.com/arcane-casters/comic/1/ko
- 영어: https://theevilent.com/arcane-casters/comic/1/en
- 웹 리더는 공개된 1화 20페이지만 사용한다. 설정 문서와 제작 참고 이미지는 공개 자산으로 복사하지 않는다.
- 사이트 메뉴에는 만화 링크를 표시하지 않고 직접 주소로만 접근한다.
- 만화 HTML과 만화 경로 응답에 noindex, noimageindex를 지정한다.
- 한국어는 selected-pages.json의 선택 이미지다. 영어는 같은 원화의 말풍선 안쪽 글자를 지우고 번역을 합성한 이미지다. 이미지 생성으로 다시 그린 영어 시안은 게시하지 않는다.
- 선택 목록 v8은 19페이지의 잘못된 이중 스프링 제본을 한쪽 윗변 제본으로 고친다. 수정 원화와 프롬프트는 art-v7/page-19-sketchbook.png와 prompts-v7/page-19-sketchbook.txt다.
- 효과음 '또르륵'은 원화에 남아 있다. 영어 접근성 텍스트에는 'Sound: roll'을 제공한다.

## 번역 수정

lettering-en.json은 말풍선별 영어 대사와 balloon-candidates.json의 영역 번호를 연결한다.
translations-en.json과 src/content/comic-pages.json의 영어 대사도 함께 맞춘다.
tools/export-comic.py는 Pillow와 Windows의 comicbd.ttf를 사용한다. 폰트 파일은 저장소에 배포하지 않는다.
원본 PNG가 있으면 사용하고, 별도 작업 환경에서는 공개된 무손실 한국어 WebP를 원본으로 사용한다.
이 도구는 말풍선/시간 상자 내부 이외의 픽셀이 바뀌면 실패한다.
lettering-verification.json은 20페이지의 합성 검사 결과다.

## 공개 파일과 검증

- 공개 자산: public/arcane-casters/comic/001/ko, en, cover.webp.
- 페이지 데이터: src/content/comic-pages.json. 제작용 컷 지시와 비공개 설정은 넣지 않는다.
- 빌드: scripts/build-comic-pages.mjs가 언어별 HTML과 OG/X 카드 정보를 만든다.
- 공유: X, Bluesky, Telegram, LINE 작성 화면과 기기 공유, 링크 복사. SNS 자동 게시 기능은 없다.
- 확인: npm run build, npm run lint, .agents/skills/verify-homepage/verify_homepage.sh.
- 만화 E2E: tests/comic.spec.ts의 언어 전환, 20장 자산, 공유 URL, 복사 성공/실패, 공유 취소, 모바일 폭, 미공개 회차 검사.
- Graphify 갱신은 명령이 설치돼 있지 않아 실행하지 못했다.
