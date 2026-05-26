# Context Notes

## 2026-05-26

- Goal: convert the single-file `onion.html` into a Chrome/Edge extension popup.
- Decision: bundle the `dprime.kr` GIF images inside the extension to avoid runtime external requests and reduce privacy/stability risk.
- Decision: keep the original `onion.html` as source material and create extension-facing files alongside it.
- Constraint: Manifest V3 extension pages should not rely on inline JavaScript, so popup behavior needs to live in `popup.js`.
- Verification target: no `https://dprime.kr/g2/img/icons/em/` references should remain in extension popup HTML after conversion.
- Implementation note: `popup.html` is generated from `onion.html`; the original file is left unchanged.
- Implementation note: `popup.js` uses one delegated setup over `button[id^='myButton']` instead of preserving the generated per-button handlers.
- Download note: 117 GIF files are referenced by `popup.html`, but downloads from `https://dprime.kr/g2/img/icons/em/` failed in this environment with `SSL/TLS 보안 채널을 만들 수 없습니다.`
- Verification note: `manifest.json` parses successfully, and extension-facing files no longer contain `https://dprime.kr` image URLs or inline `<script>` blocks.
- Resolution note: the project already had cached GIF files under `old/양파군대피소_files`, so all 117 required GIFs were copied into `images/em`.
- Size note: bundled GIF assets total 1,337,163 bytes, about 1.28 MiB.
- Encoding fix: `popup.html` was regenerated from `onion.html` using explicit UTF-8 input. The previous generation used PowerShell's default decoding and corrupted Korean text.
- Next packaging task: use `images/em/17.gif` as the source for extension icons and rename the extension to `양파군 대피소`.
- Icon update: generated `icons/icon16.png`, `icons/icon32.png`, `icons/icon48.png`, and `icons/icon128.png` from `images/em/17.gif`.
- Manifest update: renamed the extension and action title to `양파군 대피소`, fixed the Korean description, and wired the generated icon set into both `icons` and `action.default_icon`.
- Copyright notice: added a visible popup footer and `NOTICE.md` to state the dprime.kr image source and that image rights belong to the original rights holder.
- Manifest description update: changed the store-facing description to `dvd prime 전용 양파군 이모지 확장 프로그램`.
- Copyright notice update: web search found sources identifying Onion Tou/Onion Head's creator as Taiwanese artist Ethan Liu, 劉順龍. The visible popup notice and `NOTICE.md` now credit Ethan Liu while keeping the dprime.kr packaged image source note.
- Packaging update: created `dist/yangpa-extension-1.0.0.zip` for store upload. The package includes manifest, popup files, icons, NOTICE, and 117 local GIF assets.
- Mobile web app plan: keep extension files intact and add a separate static PWA entrypoint that reuses `images/em` and `icons`.
- Mobile web app implementation: added `mobile.html`, `mobile.js`, `mobile-data.json`, and `site.webmanifest`.
- Mobile web app verification: `mobile-data.json` has 10 sections and 117 emoji items, all local image files exist, no `dprime.kr` runtime URL remains, and a local server returned 200 for `mobile.html`, `mobile-data.json`, and `site.webmanifest`.
- GitHub Pages prep: added `index.html` redirecting to `mobile.html`, `README.md`, and `.gitignore` excluding generated `dist/` and source cache `old/`.
- Handoff documentation: added `HANDOFF.md` so another PC can clone or pull the repo and continue from the current state.
- Continuation note: local validation on the new machine passed for `mobile.js`, `popup.js`, JSON parsing, 10 sections, 117 items, and 0 missing local image files.
- Continuation note: local HTTP server returned 200 for `mobile.html`, `mobile-data.json`, `site.webmanifest`, and `icons/icon128.png`.
- Continuation note: GitHub now redirects `v2gundam/onion` to `v2gundam/v2gundam.github.io`; Pages should be checked at `https://v2gundam.github.io/`, not `/onion/`.
- Continuation note: public Pages URLs returned 404, and GitHub Actions run `26447520642` for `pages build and deployment` is completed with conclusion `failure`. Logs require repository admin access.
- PWA polish: generated `icons/icon192.png` and `icons/icon512.png`, added them to `site.webmanifest`, and added `.nojekyll` for static Pages publishing.
