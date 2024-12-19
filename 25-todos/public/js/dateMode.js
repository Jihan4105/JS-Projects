import { getElement } from "./utils.js";

function dateModeEnabled(formatedDate) {
  const datepickerDOM = document.getElementById("datepicker");
  const rangepickerDOM = getElement(".lightpick")
  const toInput = getElement("#to")
  const fromInput = getElement("#from")

  rangepickerDOM.style.display = "none"
  datepickerDOM.style.display = "block"

  fromInput.value = formatedDate
  toInput.disabled = true;
}

export default dateModeEnabled