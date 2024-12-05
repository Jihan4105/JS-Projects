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
  displayButtons(btnContainer, index)
}

const init = async () => {
  const followers = await fetchFollowers();
  title.textContent = "pagination"
  pages = paginate(followers)
  setupUi()
}

btnContainer.addEventListener("click", (e) => {
  if(e.target.getAttribute("name")) {
    console.log(e.target.getAttribute("name"))
    if(e.target.getAttribute("name") === "first-btn") {
      index = 0
    }
    else if(e.target.getAttribute("name") === "prev-btn") {
      index--
      if(index < 0) {
        index = pages.length - 1
      }
    }
    else if(e.target.getAttribute("name") === "next-btn") {
      index++
      if(index > pages.length - 1) {
        index = 0
      }
    }
    else if(e.target.getAttribute("name") === "last-btn") {
      index = pages.length - 1;
    }
  }
  else if(e.target.classList.contains("page-btn")) {
    index = parseInt(e.target.dataset.index)
  }

  setupUi()
})

window.addEventListener("load",init);