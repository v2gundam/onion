// 모바일 웹앱에서 양파군 이모지 목록과 복사 동작을 관리합니다.
const app = document.getElementById("app");
const tabs = document.getElementById("category-tabs");
const toast = document.getElementById("toast");
const installOpen = document.getElementById("install-open");
const installModal = document.getElementById("install-modal");
const installClose = document.getElementById("install-close");
const installMessage = document.getElementById("install-message");
const installActions = document.getElementById("install-actions");
const installNote = document.getElementById("install-note");

const CHROME_EXTENSION_URL = "https://chromewebstore.google.com/detail/fpaiacpgcfodagenmchmmklamldbkaoo?utm_source=item-share-cb";
const FIREFOX_ADDON_URL = "https://addons.mozilla.org/ko/firefox/addon/%EC%96%91%ED%8C%8C%EA%B5%B0-%EB%8C%80%ED%94%BC%EC%86%8C/";
const INSTALL_NOTICE_STORAGE_KEY = "yangpa-install-notice-dismissed-v1";

let toastTimer;

function getStoredValue(key) {
  try {
    return window.localStorage?.getItem(key);
  } catch {
    return null;
  }
}

function setStoredValue(key, value) {
  try {
    window.localStorage?.setItem(key, value);
  } catch {
    // Storage can be blocked in some embedded or private browsing contexts.
  }
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 1200);
}

function slugify(title, index) {
  return `section-${index}-${title.replace(/\s+/g, "-")}`;
}

function renderSection(section, index) {
  const id = slugify(section.title, index);
  const sectionElement = document.createElement("section");
  sectionElement.id = id;

  const heading = document.createElement("h2");
  heading.textContent = section.title;
  sectionElement.append(heading);

  const grid = document.createElement("div");
  grid.className = "emoji-grid";

  section.items.forEach((item) => {
    const button = document.createElement("button");
    button.className = "emoji-button";
    button.type = "button";
    button.dataset.code = item.code;
    button.setAttribute("aria-label", `${item.code} 복사`);

    const image = document.createElement("img");
    image.src = item.src;
    image.alt = "";
    image.loading = "lazy";

    const label = document.createElement("span");
    label.textContent = item.code;

    button.append(image, label);
    grid.append(button);
  });

  sectionElement.append(grid);
  return { id, sectionElement };
}

function getInstallTarget() {
  const userAgent = navigator.userAgent;
  const vendor = navigator.vendor || "";
  const isExtensionPage = location.protocol === "chrome-extension:" || location.protocol === "moz-extension:";
  const isAndroid = /Android/i.test(userAgent);
  const isIOS = /iPhone|iPad|iPod/i.test(userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const isMobile = isAndroid || isIOS || /Mobi|Mobile/i.test(userAgent);
  const isFirefox = /Firefox|FxiOS/i.test(userAgent);
  const isEdge = /Edg\//i.test(userAgent);
  const isChrome = /Chrome|CriOS/i.test(userAgent) && /Google Inc\./i.test(vendor);
  const isSafari = /Safari/i.test(userAgent) && !/Chrome|CriOS|Chromium|Edg|Firefox|FxiOS/i.test(userAgent);

  if (isExtensionPage) {
    return null;
  }

  if (!isMobile && isFirefox) {
    return {
      title: "Firefox 애드온으로 더 빠르게 사용하세요",
      message: "데스크톱 Firefox에서는 양파군 대피소 애드온을 설치해 바로 이모지 코드를 복사할 수 있습니다.",
      primaryLabel: "Firefox 애드온 열기",
      primaryUrl: FIREFOX_ADDON_URL,
      note: "Firefox 애드온은 Mozilla 검토나 공개 상태에 따라 페이지가 바로 열리지 않을 수 있습니다."
    };
  }

  if (!isMobile && (isChrome || isEdge)) {
    return {
      title: "확장 프로그램으로 더 편하게 사용하세요",
      message: "데스크톱 Chrome과 Edge에서는 양파군 대피소 확장 프로그램을 설치해 브라우저에서 바로 이모지 코드를 복사할 수 있습니다.",
      primaryLabel: "Chrome 웹 스토어 열기",
      primaryUrl: CHROME_EXTENSION_URL,
      note: ""
    };
  }

  if (isIOS) {
    return {
      title: "홈 화면에 추가해서 앱처럼 사용하세요",
      message: "iPhone과 iPad에서는 Safari 공유 버튼을 누른 뒤 홈 화면에 추가를 선택하면 양파군 대피소를 앱처럼 열 수 있습니다.",
      primaryLabel: "확인",
      primaryUrl: "",
      note: "iOS에서는 브라우저 확장 대신 홈 화면 추가 방식이 가장 간단합니다."
    };
  }

  if (isAndroid || isMobile) {
    return {
      title: "홈 화면에 추가해서 앱처럼 사용하세요",
      message: "모바일 브라우저 메뉴에서 홈 화면에 추가 또는 앱 설치를 선택하면 양파군 대피소를 바로 실행할 수 있습니다.",
      primaryLabel: "확인",
      primaryUrl: "",
      note: "모바일에서는 확장보다 홈 화면 추가 방식이 안정적입니다."
    };
  }

  if (isSafari) {
    return {
      title: "지원되는 데스크톱 확장을 사용하세요",
      message: "Safari 확장은 제공하지 않습니다. 데스크톱에서는 Chrome 계열 브라우저나 Firefox에서 양파군 대피소 확장을 사용할 수 있습니다.",
      primaryLabel: "Chrome 웹 스토어 열기",
      primaryUrl: CHROME_EXTENSION_URL,
      note: "Safari에서는 별도 확장 없이 웹앱으로 사용할 수 있습니다."
    };
  }

  return {
    title: "사용 환경에 맞게 설치하세요",
    message: "Chrome 계열 브라우저는 Chrome 웹 스토어, Firefox는 Firefox 애드온 페이지에서 양파군 대피소를 설치할 수 있습니다.",
    primaryLabel: "Chrome 웹 스토어 열기",
    primaryUrl: CHROME_EXTENSION_URL,
    note: ""
  };
}

function createInstallLink(label, url, isPrimary = false) {
  const link = document.createElement("a");
  link.className = isPrimary ? "install-primary" : "install-secondary";
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener";
  link.textContent = label;
  return link;
}

function createInstallCloseButton(label) {
  const button = document.createElement("button");
  button.className = "install-primary";
  button.type = "button";
  button.textContent = label;
  button.addEventListener("click", () => closeInstallModal());
  return button;
}

function openInstallModal({ markDismissed = false } = {}) {
  const target = getInstallTarget();

  if (!target || !installModal) {
    return;
  }

  if (markDismissed) {
    setStoredValue(INSTALL_NOTICE_STORAGE_KEY, "1");
  }

  document.getElementById("install-title").textContent = target.title;
  installMessage.textContent = target.message;
  const links = [];

  if (target.primaryUrl) {
    links.push(createInstallLink(target.primaryLabel, target.primaryUrl, true));
  } else {
    links.push(createInstallCloseButton(target.primaryLabel));
  }

  if (target.primaryUrl !== FIREFOX_ADDON_URL) {
    links.push(createInstallLink("Firefox 애드온", FIREFOX_ADDON_URL));
  }

  if (target.primaryUrl !== CHROME_EXTENSION_URL) {
    links.push(createInstallLink("Chrome 확장", CHROME_EXTENSION_URL));
  }

  installActions.replaceChildren(...links);
  installNote.textContent = target.note;
  installModal.hidden = false;
}

function closeInstallModal({ remember = true } = {}) {
  if (!installModal) {
    return;
  }

  installModal.hidden = true;

  if (remember) {
    setStoredValue(INSTALL_NOTICE_STORAGE_KEY, "1");
  }
}

function renderInstallFooter() {
  const footerInstall = document.createElement("p");
  footerInstall.className = "footer-install";

  const button = document.createElement("button");
  button.className = "install-footer-button";
  button.type = "button";
  button.textContent = "확장/앱 설치 안내";
  button.addEventListener("click", () => openInstallModal({ markDismissed: true }));

  footerInstall.append(button);
  return footerInstall;
}

function renderFooter() {
  const footer = document.createElement("footer");
  if (getInstallTarget()) {
    footer.append(renderInstallFooter());
  }
  footer.append("양파군 원작자: Ethan Liu(劉順龍). 이미지 출처: dprime.kr. 이미지 저작권은 원 권리자에게 있습니다.");
  return footer;
}

function renderLoadError() {
  const sectionElement = document.createElement("section");
  sectionElement.className = "load-error";

  const heading = document.createElement("h2");
  heading.textContent = "이모지 목록을 불러오지 못했습니다";

  const message = document.createElement("p");
  message.textContent = "로컬 파일을 직접 열면 브라우저 보안 정책 때문에 mobile-data.json을 읽을 수 없습니다. GitHub Pages 주소로 접속하거나, 이 폴더에서 로컬 서버를 실행한 뒤 http://localhost:8000/mobile.html로 열어주세요.";

  sectionElement.append(heading, message);
  app.append(sectionElement);
}

function initInstallPrompt() {
  if (!installOpen || !installModal || !getInstallTarget()) {
    installOpen?.remove();
    return;
  }

  installOpen.addEventListener("click", () => openInstallModal({ markDismissed: true }));
  installClose.addEventListener("click", () => closeInstallModal());
  installModal.addEventListener("click", (event) => {
    if (event.target === installModal) {
      closeInstallModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !installModal.hidden) {
      closeInstallModal();
    }
  });

  if (getStoredValue(INSTALL_NOTICE_STORAGE_KEY) !== "1") {
    openInstallModal();
  }
}

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.append(textarea);
  textarea.focus();
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

async function init() {
  try {
    const response = await fetch("mobile-data.json");
    if (!response.ok) {
      throw new Error(`Failed to load mobile-data.json: ${response.status}`);
    }

    const sections = await response.json();

    sections.forEach((section, index) => {
      const { id, sectionElement } = renderSection(section, index);
      app.append(sectionElement);

      const tab = document.createElement("a");
      tab.href = `#${id}`;
      tab.textContent = section.title;
      tabs.append(tab);
    });
  } catch {
    renderLoadError();
  }

  app.append(renderFooter());
  initInstallPrompt();
}

app.addEventListener("click", async (event) => {
  const button = event.target.closest(".emoji-button");

  if (!button) {
    return;
  }

  try {
    await copyText(button.dataset.code);
    showToast(`${button.dataset.code} 복사했습니다.`);
  } catch {
    showToast("복사하지 못했습니다.");
  }
});

init();
