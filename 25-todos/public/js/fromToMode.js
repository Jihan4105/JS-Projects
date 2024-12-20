import formatDate from "./formatDate.js";
import { getElement } from "./utils.js";

function fromToModeEnabled(selectedDate) {  
  const datepickerDOM = document.getElementById("datepicker");
  const rangepickerDOM = getElement(".lightpick")
  const allRadioBtn = getElement(".all-radio")
  const notyetRadioBtn = getElement(".notyet-radio")
  const doneRadioBtn = getElement(".done-radio")
  const fromInput = getElement("#from")
  const toInput = getElement("#to")
  const todoLists = getElement(".todo-lists")

  rangepickerDOM.classList.add("show")
  datepickerDOM.classList.remove("show")
  todoLists.innerHTML = ""
  fromInput.value = ""
  allRadioBtn.checked = true;
  notyetRadioBtn.checked = false;
  doneRadioBtn.checked = false

  toInput.disabled = false
}

export default fromToModeEnabled