import { getElement } from "./utils.js";

function fromToModeEnabled() {  
  const datepickerDOM = document.getElementById("datepicker");
  const rangepickerDOM = getElement(".lightpick")

  rangepickerDOM.style.display = "inline-block"
  datepickerDOM.style.display = "none"
}

export default fromToModeEnabled