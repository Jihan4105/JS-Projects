import isUser from "../isUser.js";
import { getElement } from "../utils.js";

async function login(e) {
  e.preventDefault();
  const id = getElement("#id").value;
  const password = getElement("#password").value;
  const failedText = getElement(".failed-text");
  const { res, message } = await isUser(id, password);
  console.log(res, message);

  if (res === "success") {
    window.location.href = "http://localhost:5500/index.html";
  } else {
    failedText.textContent = message;
    failedText.style.display = "block";
  }
}

getElement(".login-btn").addEventListener("click", login);
