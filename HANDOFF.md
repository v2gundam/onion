# 작업 인수인계 문서

이 문서는 다른 PC에서 `git pull` 후 바로 이어서 작업하기 위한 요약입니다.

## 프로젝트 목적

`onion.html`에 있던 DVD Prime 양파군 이모티콘 복사 페이지를 두 가지 형태로 정리했습니다.

- Chrome/Edge 데스크톱 확장 프로그램.
- 모바일 브라우저용 정적 PWA.

## 저장소

- GitHub 원격: `https://github.com/v2gundam/onion.git`.
- 기본 브랜치: `main`.

다른 PC에서 이어받는 명령입니다.

```powershell
git clone https://github.com/v2gundam/onion.git
cd onion
```

이미 clone 되어 있으면 다음 명령을 사용합니다.

```powershell
git pull origin main
```

## 주요 파일

- `index.html`: GitHub Pages 루트 진입점입니다. `mobile.html`로 이동합니다.
- `mobile.html`: 모바일 웹앱 화면입니다.
- `mobile.js`: 모바일 웹앱 렌더링과 클립보드 복사 로직입니다.
- `mobile-data.json`: 섹션 10개와 이모지 117개 데이터입니다.
- `site.webmanifest`: PWA 설치 정보입니다.
- `.nojekyll`: GitHub Pages에서 Jekyll 처리를 건너뛰고 정적 파일을 그대로 배포하도록 합니다.
- `manifest.json`: Chrome/Edge 확장 프로그램 manifest입니다.
- `popup.html`: 확장 프로그램 팝업 화면입니다. 현재 모바일 웹앱 레이아웃을 기반으로 합니다.
- `mobile.js`: 모바일 웹앱과 확장 팝업의 렌더링/클립보드 복사 로직입니다.
- `popup.js`: 이전 팝업 복사 로직입니다. 현재 `popup.html`에서는 사용하지 않습니다.
- `images/em`: 양파군 GIF 117개입니다.
- `icons`: 17번 이모지를 바탕으로 만든 앱/확장 아이콘입니다.
- `NOTICE.md`: 원작자, 이미지 출처, 저작권 고지입니다.
- `checklist.md`: 작업 체크리스트입니다.
- `context-notes.md`: 작업 중 결정과 검증 로그입니다.

## 현재 구현 상태

- 외부 `dprime.kr` 이미지 URL은 런타임 파일에서 제거했습니다.
- 이모지 이미지는 모두 로컬 `images/em`에 포함했습니다.
- 확장 프로그램 이름은 `양파군 대피소`입니다.
- 확장 설명은 `dvd prime 전용 양파군 이모지 확장 프로그램`입니다.
- 팝업과 NOTICE에 원작자 Ethan Liu, 劉順龍과 이미지 출처 dprime.kr 고지를 넣었습니다.
- 모바일 PWA는 홈 화면 추가를 염두에 두고 `site.webmanifest`를 포함합니다.
- PWA 아이콘은 48, 128, 192, 512 PNG를 포함합니다.

## 로컬 검증 명령

```powershell
node --check .\mobile.js
node --check .\popup.js
node -e "const fs=require('fs'); JSON.parse(fs.readFileSync('manifest.json','utf8')); JSON.parse(fs.readFileSync('site.webmanifest','utf8')); const data=JSON.parse(fs.readFileSync('mobile-data.json','utf8')); const missing=data.flatMap(s=>s.items.map(i=>i.src)).filter(p=>!fs.existsSync(p)); console.log({sections:data.length,items:data.reduce((n,s)=>n+s.items.length,0),missing:missing.length});"
```

로컬 웹앱 확인 명령입니다.

```powershell
python -m http.server 8765
```

브라우저에서 엽니다.

```text
http://127.0.0.1:8765/mobile.html
```

같은 네트워크의 휴대폰에서는 PC의 내부 IP를 사용합니다.

```text
http://PC_IP:8765/mobile.html
```

## GitHub Pages 설정

GitHub 저장소에서 다음으로 이동합니다.

```text
Settings → Pages
```

권장 설정입니다.

```text
Source: Deploy from a branch
Branch: main
Folder: /root
Custom domain: 비워둠
```

예상 Pages URL입니다.

```text
https://v2gundam.github.io/onion/
```

직접 모바일 페이지를 열려면 다음 URL을 사용합니다.

```text
https://v2gundam.github.io/onion/mobile.html
```

2026-05-26 21:31 KST 확인 결과 `https://v2gundam.github.io/onion/`와 `/onion/mobile.html`은 아직 404입니다. 공개 GitHub Actions API에서 최신 `pages build and deployment` 실행 `26448123934`이 failure로 끝났고, 직전 실행과 동일하게 `Checkout` 단계에서 실패했습니다.

코드 빌드 오류라기보다 GitHub Pages/Actions 권한 또는 Pages 소스 설정 문제로 보입니다. 저장소 관리자 화면에서 다음을 확인합니다.

```text
Settings → Pages → Source: Deploy from a branch / Branch: main / Folder: /root
Settings → Actions → General → Workflow permissions: Read and write permissions
```

## Chrome/Edge 확장 사용

로컬에서 압축해제 확장으로 테스트합니다.

```text
chrome://extensions → 개발자 모드 → 압축해제된 확장 프로그램 로드 → 저장소 폴더 선택
```

배포용 ZIP은 현재 작업에서 `dist/yangpa-extension-1.0.1.zip`으로 다시 만들었습니다. 팝업은 웹페이지와 같은 레이아웃이며, `mobile.js`와 `mobile-data.json`을 함께 패키징합니다. `dist/`는 `.gitignore` 대상이므로 다른 PC에서는 필요할 때 다시 생성하면 됩니다.

## 남은 작업

- GitHub Pages 배포가 실제로 열리는지 확인합니다.
- GitHub Actions의 Pages build `Checkout` 403 실패를 저장소 설정에서 해결하고 재배포합니다.
- 모바일에서 복사 기능과 홈 화면 추가를 테스트합니다.
- 공개 배포 전 양파군 이미지 사용 허락 또는 사용 조건을 확인합니다.
- Chrome Web Store 배포를 진행할 경우 스토어용 스크린샷과 개인정보 항목을 준비합니다.

## 주의 사항

저작권 고지는 사용 허락을 대체하지 않습니다. 공개 배포 범위를 넓히기 전에는 양파군 이미지와 캐릭터 사용 조건을 확인하는 것이 안전합니다.
