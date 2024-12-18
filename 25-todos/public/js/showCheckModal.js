import { getElement } from "./utils.js"

//수정취소를 클릭하였을때 발생하는 이벤트들
function showWorkCheckModal(selectedDate) {
  const selectedMilisecond = new Date(selectedDate).getTime()
  const firstCancelBtn = getElement(".first-dangerous-btn")
  const secondCancelBtn = getElement(".second-dangerous-btn")
  const returnToFormBtn = getElement(".return-btn")
  const overlay = getElement(".overlay")
  const overlayContainer = getElement(".overlay-container")
  firstCancelBtn.addEventListener("click", (e) => {
    e.preventDefault()
  
    overlay.classList.add("show")
    overlayContainer.classList.add("show")
  })
  
  secondCancelBtn.addEventListener("click", () => {
    window.location.href = `http://localhost:5500/index.html?date=${selectedMilisecond}`
  })
  
  returnToFormBtn.addEventListener("click", () => {
    overlay.classList.remove("show")
    overlayContainer.classList.remove("show")
  })
}  

export default showWorkCheckModal