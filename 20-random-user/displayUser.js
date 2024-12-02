import getElement from "./getElement.js"
import removeActive from "./removeActive.js";

const img = getElement(".user-img");
const title = getElement(".user-title");
const value = getElement(".user-value");
const btnsContainer = [...document.querySelectorAll(".btn-container")];

const displayUser = (person) => {
  img.src = person.image 
  value.textContent = person.name;
  title.textContent = "My name is"

  removeActive(btnsContainer);
  btnsContainer[0].classList.remove("active");
  btnsContainer.forEach((btn) => {
    const label = btn.firstElementChild.dataset.label;

    btn.addEventListener("click", () => {
      title.textContent = `My ${label} is`;

      value.textContent = person[label];

      removeActive(btnsContainer);

      btn.classList.add("active");
    })
  })
}

export default displayUser;