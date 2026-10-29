# 2화 제작 자료

현재 만화는 PLAN.md와 selected-pages.json의 10장 구성이다. index.html은 선택 PNG를 순서대로 보여주는 로컬 검토용이다. 웹페이지용 자산과 한영 텍스트는 PUBLICATION.md를 따른다.

PR에는 현재 선택한 원화와 최종 프롬프트, 제작·게시 도구를 포함한다. 반려된 전체 작화와 중간 시안은 포함하지 않는다. 선택 목록의 baseSource와 previousNumber는 과거 작업본의 출처를 기록한 것이며, 웹 자산 생성에는 src와 prompt만 사용한다.

REFERENCES-v4.md와 REFERENCES-v6.md는 수정 경위를 기록한다. 이전 번호의 5·7장 전면 그림은 최신 10장 구성에서 7·9장이다. 최신 대본은 PLAN.md를 우선한다.

검토용 재생성:

```powershell
python -X utf8 update-status.py
python -X utf8 build-reader.py
```

웹 자산 재생성은 website 루트에서 다음을 실행한다.

```powershell
python -X utf8 content/arcane-casters/story/episodes/002/tools/export-comic.py
npm run build
```
