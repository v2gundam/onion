// 모바일 웹앱에서 양파군 이모지 목록과 복사 동작을 관리합니다.
const app = document.getElementById("app");
const tabs = document.getElementById("category-tabs");
const toast = document.getElementById("toast");

let toastTimer;

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
  const response = await fetch("mobile-data.json");
  const sections = await response.json();

  sections.forEach((section, index) => {
    const { id, sectionElement } = renderSection(section, index);
    app.append(sectionElement);

    const tab = document.createElement("a");
    tab.href = `#${id}`;
    tab.textContent = section.title;
    tabs.append(tab);
  });

  const footer = document.createElement("footer");
  footer.textContent = "양파군 원작자: Ethan Liu(劉順龍). 이미지 출처: dprime.kr. 이미지 저작권은 원 권리자에게 있습니다.";
  app.append(footer);
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
