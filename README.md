# 클라(Klar) 무향 욕실세정제 상세 페이지

독일 프리미엄 에코 센시티브 무향 욕실세정제 500ml 상품 상세 페이지입니다.

---

## GitHub Pages 배포 방법

이 프로젝트는 **GitHub Actions 자동 배포**와 **`/docs` 폴더 브랜치 배포** 두 가지 방식 모두 지원하도록 설정되어 있습니다.

### 방법 1. 브랜치(`/docs`)로 바로 배포하기 (가장 간단)
1. 이 프로젝트 파일 전체를 GitHub 저장소(Repository)에 업로드합니다.
2. GitHub 저장소 상단의 **Settings** → 왼쪽 메뉴 **Pages**로 이동합니다.
3. **Build and deployment**의 **Source**에서 **`Deploy from a branch`**를 선택합니다.
4. Branch를 **`main`**(또는 `master`), 폴더를 **`/docs`**로 선택한 뒤 **Save**를 누릅니다.
5. 1~2분 후 페이지 상단에 표시되는 `https://<아이디>.github.io/<저장소이름>/` 주소로 접속합니다.

### 방법 2. GitHub Actions로 자동 배포하기
1. GitHub 저장소 상단의 **Settings** → **Pages**로 이동합니다.
2. **Source**에서 **`GitHub Actions`**를 선택합니다.
3. `main` 또는 `master` 브랜치에 코드를 푸시하거나 **Actions** 탭에서 **`Deploy to GitHub Pages`** 워크플로우를 실행하면 자동으로 빌드 및 배포됩니다.

---

## 로컬 실행 및 빌드 명령어
```bash
npm install
npm run dev          # 개발 서버 실행
npm run build        # dist/ 프로덕션 빌드
npm run build:pages  # dist/ 및 docs/ 배포용 파일 동시 생성
```
