import formatDate from "../formatDate.js";
import fetchTodos from "../fetchTodos.js";

const elem = document.getElementById('datepicker');
const datepicker = new Datepicker(elem, {
  // ...options
}); 

const dateContainer = document.querySelector(".datepicker-grid")

dateContainer.addEventListener("click", (e) => {
  const milisecond = parseInt(e.target.dataset.date)
  console.log(milisecond)

  const { date, time } = formatDate(milisecond)  

  fetchTodos(milisecond)
})