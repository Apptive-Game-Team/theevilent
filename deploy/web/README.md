# 홈페이지 Nginx 이미지 게시

`dev` 또는 `deploy`에 push하면 `npm ci`, `npm run build`, lint를 실행한 뒤 Nginx 이미지를 검사하고
`ghcr.io/apptive-game-team/theevilent`에 게시합니다. `workflow_dispatch`도 두 브랜치에서만
게시합니다. PR에서는 같은 이미지 검사를 실행하되 GHCR에 게시하지 않습니다.

- `dev`: dev 브랜치의 최근 게시 이미지.
- `deploy`, `latest`: deploy 브랜치의 최근 게시 이미지. dev 빌드는 이 태그를 변경하지 않습니다.
- `sha-<전체 커밋 SHA>`: 서버 배포 및 롤백용 태그. Actions summary에서 확인합니다.
- 플랫폼: `linux/amd64`, `linux/arm64`. 게시 시 buildx로 두 아키텍처를 함께 빌드합니다.

서버 갱신은 기존 Watchtower에 맡깁니다. dev 병합 후 기존 승격 절차로 deploy에도
이 workflow를 반영해야 deploy 이미지 게시가 실행됩니다.

빌드 결과 `dist/`만 이미지에 복사합니다. `content/`의 작가용 원고·원본 이미지와
저장소, node_modules는 포함하지 않습니다. Vercel 설정과 기존 배포는 유지합니다.
서버와 DNS를 전환하기 전까지 기존 Vercel 서비스가 계속 동작합니다.

## GitHub 설정

게시에는 `GITHUB_TOKEN`과 `packages: write` 권한을 사용합니다.
조직 정책에서 Actions의 package 생성을 허용해야 합니다. 기존 package가 있다면
이 저장소에 Actions 접근 권한이 있는지도 확인합니다.
Package 공개 여부는 자동으로 변경하지 않습니다. private package를 받는 서버는
`read:packages` 권한을 가진 계정으로 `docker login ghcr.io`를 먼저 실행합니다.

## 서버 실행

Docker Compose가 설치된 서버에 `compose.yaml`을 복사하고 게시된 SHA를 지정합니다.

```bash
export WEBSITE_IMAGE_TAG=sha-<전체-커밋-SHA>
docker compose -f compose.yaml pull
docker compose -f compose.yaml up -d
docker compose -f compose.yaml exec -T website wget --spider -q http://127.0.0.1:8080/
```

서버의 기존 external Docker 네트워크 `net`에 연결합니다. 컨테이너 이름은 `theevilent`이고 Nginx 내부 포트는 `8080`입니다. 호스트 포트는 공개하지 않습니다. Nginx Proxy Manager에서 `http`, `theevilent`, `8080`으로 전달합니다.
인증서 갱신과 DNS는 서버에서 별도로 관리합니다.

```nginx
location / {
    proxy_pass http://theevilent:8080;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}
```

DNS 변경 전 새 서버에서 홈페이지/하위 페이지 새로고침/만화/이미지를 확인하고
HTTPS 인증서까지 준비합니다. 기존 DNS 값은 롤백할 수 있게 기록합니다.
Compose 교체는 무중단 배포가 아니며 이전 페이지의 asset은 새 이미지에 없을 수 있습니다.

## 검증과 롤백

Nginx는 SPA 경로와 만화 정적 HTML을 제공하고 기존 만화 307 리다이렉트 및
`X-Robots-Tag`를 유지합니다. 누락 정적 파일은 404입니다.
검사 스크립트는 `vercel.json`의 모든 명시적 redirect/rewrite와 결과 본문을 비교합니다.
만화 회차를 추가하면서 Vercel 라우팅을 바꾸면 Nginx 설정도 함께 갱신하고 검사를 실행합니다.

```bash
npm ci
npm run build
bash deploy/web/build-image.sh website-local dist
bash deploy/web/check-image.sh website-local dist
```

롤백은 `WEBSITE_IMAGE_TAG`를 이전 게시 SHA로 바꾸고 pull/up을 다시 실행합니다.
운영에 사용한 이전 태그는 GHCR에서 삭제하지 않습니다.

Compose는 기본으로 latest를 사용하고 Watchtower 갱신 라벨과 healthcheck를 포함합니다. SHA 태그로 고정하면 해당 태그를 사용하는 동안 최신 운영 태그로 자동 전환되지 않습니다.
