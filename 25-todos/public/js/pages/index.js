import formatDate from "../formatDate.js";

const elem = document.getElementById('datepicker');
const datepicker = new Datepicker(elem, {
  // ...options
}); 

const dateContainer = document.querySelector(".datepicker-grid")

dateContainer.addEventListener("click", (e) => {
  const milisecond = parseInt(e.target.dataset.date)
  
  const { date, time} = formatDate(milisecond)
})