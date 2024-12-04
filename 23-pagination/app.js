import displayFollowers from "./displayFollowers.js";
import fetchFollowers from "./fetchFollowers.js";
import paginate from "./paginate.js";
import displayButtons from "./displayButtons.js";


const title = document.querySelector(".section-title h1")
const btnContainer = document.querySelector(".btn-container")

let index = 0
let pages = []

const setupUi = () => {
  displayFollowers(pages[index])
  displayButtons(btnContainer,pages,index)
}

const init = async () => {
  const followers = await fetchFollowers();
  title.textContent = "pagination"
  pages = paginate(followers)
  setupUi()
}

btnContainer.addEventListener("click", (e) => {
  if(e.target.dataset.index === "first") {
    index = 0;
  }
  else if(e.target.dataset.index === "last") {
    index = pages.length - 1;
  }
  else{
    if(e.target.classList.contains("btn-container")) {
      return;
    }
    else if(e.target.classList.contains("page-btn")) {
      index = parseInt(e.target.dataset.index)
    }
    else if(e.target.classList.contains("next-btn") || e.target.classList.contains("fa-chevron-right")) {
      index++
      if(index > pages.length - 1) {
        index = 0
      }
    }
    else if(e.target.classList.contains("prev-btn") || e.target.classList.contains("fa-chevron-left")) {
      index--
      if(index < 0) {
        index = pages.length - 1
      }
    }
  }

  setupUi()
})

window.addEventListener("load",init);