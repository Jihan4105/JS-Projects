import formatDate from "../formatDate.js";
import { getElement, searchStringToObject } from "../utils.js";
import displayTodos from "../displayTodos.js";
import { deleteTodo } from "../fetchTodo.js";

// GlobalVariables
let selectedMilisecond = searchStringToObject(new URL(`${window.location.href}`)).date
let selectedDate = formatDate(parseInt(selectedMilisecond)).date
let deleteTodoId;
const overlay = getElement(".overlay")
const overlayContainer = getElement(".overlay-container")

// Vanila JS Datepicker 
const datepickerDOM = document.getElementById("datepicker");
const datepicker = new Datepicker(datepickerDOM, {
  // ...options
  format: "yyyy-mm-dd",
  todayHighlight: true,
  defaultViewDate: selectedDate,
  maxDate: "2200-12-31",
  minDate: "1990-01-01"
});

// 로고이벤트 리스너 달아주기
const logo = getElement(".logo")
logo.addEventListener("click", () => window.location.href = `http://127.0.0.1:5500/index.html?date=${selectedMilisecond}`)

//페이지가 로딩 되었을때 실행
document.addEventListener("DOMContentLoaded", () => {
  getElement(".datepicker-cell.focused").classList.add("selected")
  const url = new URL(`${window.location.href}`);
  const { date } = searchStringToObject(url)
  const formatedDate = formatDate(parseInt(date)).date
  const dateStartMilisecond = new Date(formatedDate + ":00:00:00").getTime()
  const dateEndMilisecond = new Date(formatedDate + ":23:59:59").getTime()

  displayTodos(dateStartMilisecond, dateEndMilisecond)
})


// Datepicker가 Select 되었을때 실행
const dateContainer = getElement(".datepicker-grid");
const todoLists = getElement(".todo-lists");

dateContainer.addEventListener("click", async (e) => {
  const milisecond = parseInt(e.target.dataset.date);
  selectedDate = formatDate(milisecond).date
  selectedMilisecond = milisecond.toString()
  const dateStartMilisecond = new Date(selectedDate + ":00:00:00").getTime()
  const dateEndMilisecond = new Date(selectedDate + ":23:59:59").getTime()
  
  displayTodos(dateStartMilisecond, dateEndMilisecond)
});

todoLists.addEventListener("click", (e) => {
  // List Item Clicked
  if (e.target.classList.contains("clickable")) {
    window.location.href = `http://localhost:5500/todo.html?id=${e.target.dataset.id}&mode=read&selectedMilisecond=${selectedMilisecond}`;
  }

  // Edit button Clicked
  else if (e.target.classList.contains("edit-btn")) {
    window.location.href = `http://localhost:5500/todo.html?id=${e.target.parentElement.dataset.id}&mode=update&selectedMilisecond=${selectedMilisecond}`;
  }

  // Delete button Clicked
  else if (e.target.classList.contains("delete-btn")) {
    deleteTodoId = e.target.parentElement.dataset.id
    overlay.classList.add("show")
    overlayContainer.classList.add("show")
  }
});


// New Button이 클릭되었을때
const newBtn = getElement(".new-btn")
newBtn.addEventListener("click", (e) => {
  e.preventDefault()

  window.location.href = `http://localhost:5500/todo.html?mode=create&selectedDate=${selectedDate}&selectedMilisecond=${selectedMilisecond}`
})

// DeleteModal 관련 핸들러들들
const secondDeleteButton = getElement(".second-dangerous-btn")
const returnToFormBtn = getElement(".return-btn")
secondDeleteButton.addEventListener("click", () => {
  deleteTodo(deleteTodoId)
})

returnToFormBtn.addEventListener("click", () => {
  overlay.classList.remove("show")
  overlayContainer.classList.remove("show")
})
