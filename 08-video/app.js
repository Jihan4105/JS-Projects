const btn = document.querySelector(".switch-btn");
const video = document.querySelector(".video-container");
const preloader = document.querySelector(".preloader");

window.addEventListener("load", () => {
  setTimeout(() => {preloader.classList.add("hide-preloader")},1000)
})

btn.addEventListener("click", () => {
  if(!btn.classList.contains("slide")){
    btn.classList.add("slide")
    video.pause()
  }
  else {
    btn.classList.remove("slide")
    video.play()
  }
})