import formatDate from "./formatDate.js";
import { getElement } from "./utils.js";

function fromToModeEnabled() {  
  const singlePickerDOM = getElement(".single-picker");
  const rangePickerDOM = getElement(".range-picker")
  const allRadioBtn = getElement(".all-radio")
  const notyetRadioBtn = getElement(".notyet-radio")
  const doneRadioBtn = getElement(".done-radio")
  const fromInput = getElement("#from")
  const toInput = getElement("#to")
  const todoLists = getElement(".todo-lists")

  rangePickerDOM.classList.add("show")
  singlePickerDOM.classList.remove("show")
  todoLists.innerHTML = ""
  fromInput.value = ""
  allRadioBtn.checked = true;
  notyetRadioBtn.checked = false;
  doneRadioBtn.checked = false
  toInput.disabled = false
}

export default fromToModeEnabled