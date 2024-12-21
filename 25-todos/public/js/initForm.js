import { getElement } from "./utils.js"
import displayTodos from "./displayTodos.js"

function initForm(localObj, startMilisecond, endMilisecond) {
  const singlePickerDOM = getElement(".single-picker")
  const rangePickerDOM = getElement(".range-picker")
  const radioBtns = [...document.querySelectorAll(".radio-btn")]
  const fromInput = getElement("#from")
  const toInput = getElement("#to")
  const searchInput = getElement(".search-input")

  //검색 컨디션 불러오기
  getElement("#date-mode").checked = (localObj.mode === "date") ? true : false
  getElement("#from-to-mode").checked = (localObj.mode === "date") ? false : true
  fromInput.value = (localObj.mode === "date") ? localObj.date : localObj.fromDate
  toInput.value = (localObj.mode === "date") ? "" :  localObj.toDate
  toInput.disabled = (localObj.mode === "date") ? true : false
  searchInput.value = localObj.searchString

  radioBtns.forEach((radioBtn) => {
    if(radioBtn.dataset.done === localObj.radio) {
      radioBtn.checked = true
    } else {
      radioBtn.checked = false
    }
  })

  if( localObj.mode === "date" ) {
    singlePickerDOM.classList.add("show")
    rangePickerDOM.classList.remove("show")
  } else {
    singlePickerDOM.classList.remove("show")
    rangePickerDOM.classList.add("show")   
  }

  displayTodos(startMilisecond, endMilisecond, localObj.searchString, localObj.radio)
}

export default initForm