import { getElement } from "../utils.js"

//Title이 빈칸일때 errorMessage 보이기
function noTitleErrorHandler() {
  const todoTitle = getElement(".todo-title")
  todoTitle.addEventListener("keyup", (e) => {
    const titleErrorDOM = getElement(".title-error")
  
    if(!todoTitle.value) {
      todoTitle.classList.add("error")
      titleErrorDOM.classList.add("show")
    } else {
      todoTitle.classList.remove("error")
      titleErrorDOM.classList.remove("show")
    }
  })
}
export default noTitleErrorHandler
