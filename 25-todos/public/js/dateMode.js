import { getElement } from "./utils.js";

function dateModeEnabled(formatedDate) {
  const datepickerDOM = document.getElementById("datepicker");
  const rangepickerDOM = getElement(".lightpick")
  const todoLists = getElement(".todo-lists")
  const searchInput = getElement(".search-input")
  const toInput = getElement("#to")
  const fromInput = getElement("#from")

  datepickerDOM.classList.add("show")
  rangepickerDOM.classList.remove("show")
  todoLists.innerHTML = ""
  searchInput.value = ""

  fromInput.value = formatedDate
  toInput.value = "";
  toInput.disabled = true;

  
}

export default dateModeEnabled