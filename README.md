# 양파군 대피소

dvd prime 전용 양파군 이모지 확장 프로그램과 모바일 웹앱입니다.

## 모바일 웹앱

GitHub Pages에서 `mobile.html`을 열면 모바일 브라우저에서 양파군 이모지 코드를 복사할 수 있습니다.

예상 공개 URL은 `https://v2gundam.github.io/onion/mobile.html`입니다.

## 웹 전용 AdSense

`mobile.html`만 `web-ads.js`를 불러옵니다. 광고 스크립트는 실제 배포 주소인
`https://v2gundam.github.io/onion/` 아래에서만 로드되며, 로컬 미리보기와
확장 프로그램에서는 로드하지 않습니다. `popup.html`과 공용 `mobile.js`는
광고 코드를 포함하지 않습니다.

- 게시자: `ca-pub-6207625854271970`.
- 광고 형식: Google이 지원하는 `data-overlays="collapsed-bottom"` 설정으로
  일반 하단 앵커 광고를 사용합니다.
- `index.html`과 `mobile.html`에 사이트 확인용 메타 태그를 포함합니다.
- 개인정보 및 광고 안내는 `privacy.html`에서 제공합니다.

실제 게재 전 AdSense에서 기존 AdMob 계정의 웹사이트용 신청을 완료하고
`v2gundam.github.io`를 사이트로 등록하여 심사를 요청해야 합니다.
광고 설정에서 다른 자동 광고 형식은 끄고 하단 앵커 광고만 사용합니다.
필요한 지역의 동의 메시지는 AdSense의 개인정보 보호 및 메시지 메뉴에서 설정합니다.
코드를 배포한 것만으로 사이트 승인이나 광고 노출이 보장되지는 않습니다.

AdSense가 제공하는 `ads.txt` 항목은 `/onion/ads.txt`가 아니라
`https://v2gundam.github.io/ads.txt`에서 제공해야 합니다.
루트 사이트의 기존 파일이 있다면 항목을 보존하고 아래 줄을 추가합니다.

```text
google.com, pub-6207625854271970, DIRECT, f08c47fec0942fa0
```

2026-10-03: 코드 준비 완료. AdSense 웹 신청, 사이트 심사, 동의 메시지와
루트 ads.txt 설정은 별도 확인이 필요합니다.

## Chrome/Edge 확장

Chrome 또는 Edge의 확장 관리 화면에서 이 저장소 폴더를 압축해제 확장으로 로드할 수 있습니다.

## 저작권 및 출처

양파군 원작자: Ethan Liu(劉順龍).

이미지 출처: dprime.kr.

이미지와 캐릭터의 저작권은 원 권리자에게 있습니다. 자세한 내용은 `NOTICE.md`를 참고하세요.

## 이어서 작업하기

다른 PC에서 작업을 이어갈 때는 `HANDOFF.md`를 먼저 확인하세요.
