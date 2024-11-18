// const openModalBtn = document.querySelector(".modal-btn");
// const closeModalBtn = document.querySelector(".close-btn");
// const modalContainer = document.querySelector(".modal-overlay")

document.querySelector(".modal-btn").addEventListener("click", function () {
  document.querySelector(".modal-overlay").classList.add("open-modal");
})

document.querySelector(".close-btn").addEventListener("click", function () {
  document.querySelector(".modal-overlay").classList.remove("open-modal");
})