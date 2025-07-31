 window.addEventListener("DOMContentLoaded", () => {
    const userName = localStorage.getItem("username");
    const emmexEl = document.getElementById("emmex");

    if (userName && emmexEl) {
      emmexEl.textContent = `Welcome, ${userName}`;
    }
  });