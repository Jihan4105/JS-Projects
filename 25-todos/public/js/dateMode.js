import { getElement } from "./utils.js";

function dateModeEnabled(formatedDate) {
  // const datepickerDOM = getElement("#single-datepicker");
  // const rangePickerDOM = getElement(".lightpick")
  const singlePickerDOM = getElement(".single-picker")
  const rangePickerDOM = getElement(".range-picker") 
  const todoLists = getElement(".todo-lists")
  const searchInput = getElement(".search-input")
  const toInput = getElement("#to")
  const fromInput = getElement("#from")

  // datepickerDOM.classList.add("show")
  singlePickerDOM.classList.add("show")
  rangePickerDOM.classList.remove("show")
  todoLists.innerHTML = ""
  searchInput.value = ""

  fromInput.value = formatedDate
  toInput.value = "";
  toInput.disabled = true;

  
}

export default dateModeEnabled