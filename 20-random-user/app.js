import getElement from "./getElement.js";
import getUser from "./fetchUser.js";
import displayUser from "./displayUser.js";

const btn = getElement(".btn");

const showUser = async () => {
  const person = await getUser();

  console.log(person);

  displayUser(person);
}

window.addEventListener("DOMContentLoaded", showUser);
btn.addEventListener("click", showUser);
