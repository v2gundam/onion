// 확장 팝업에서 이모티콘 복사 동작을 연결합니다.
const notification = document.getElementById("notification-container");

function showNotification() {
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 1000);
}

document.querySelectorAll("button[id^='myButton']").forEach((button) => {
  button.addEventListener("click", () => {
    const code = button.querySelector("div[id^='o']");

    if (!code) {
      return;
    }

    window.navigator.clipboard.writeText(code.textContent).then(() => {
      showNotification();
    });
  });
});
