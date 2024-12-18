import { getElement } from "../utils.js"

//수정취소를 클릭하였을때 발생하는 이벤트들
function cancelWorksHandler() {
  const firstCancelBtn = getElement(".first-dangerous-btn")
  const secondCancelBtn = getElement(".second-dangerous-btn")
  const returnToFormBtn = getElement(".return-btn")
  const todoOverlay = getElement(".todo-overlay")
  const todoOverlayContainer = getElement(".todo-overlay-container")
  firstCancelBtn.addEventListener("click", (e) => {
    e.preventDefault()
  
    todoOverlay.classList.add("show")
    todoOverlayContainer.classList.add("show")
  })
  
  secondCancelBtn.addEventListener("click", () => {
    console.log("!")
    window.location.href = "http://localhost:5500/index.html"
  })
  
  returnToFormBtn.addEventListener("click", () => {
    todoOverlay.classList.remove("show")
    todoOverlayContainer.classList.remove("show")
  })
}  

export default cancelWorksHandler