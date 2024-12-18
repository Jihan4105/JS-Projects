import { getElement } from "../utils.js"

//allday-checkbox가 클릭되었을때 timeInput의 속성과 값을 핸들링한다
function alldayCheckBoxHandler() {
  const alldayCheckBox = getElement(".allday-checkbox")
  alldayCheckBox.addEventListener("click", (e) => {
    const todoTime = getElement(".todo-time")

    if(e.target.checked === true) {
      todoTime.value = "00:00"
      todoTime.disabled = true
    } else {
      todoTime.removeAttribute("disabled")
    }
  })
}

export default alldayCheckBoxHandler