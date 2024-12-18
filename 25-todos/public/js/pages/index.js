import formatDate from "../formatDate.js";
import fetchTodos from "../fetchTodos.js";
import { getElement, searchStringToObject } from "../utils.js";
import { deleteTodo } from "../fetchTodo.js";

// GlobalVariables
const url = new URL(`${window.location.href}`);
let selectedDate = formatDate(new Date().getTime()).date
let selectedMilisecond = searchStringToObject(url).date
// const todayStartMilisecond = new Date(selectedDate + ":00:00:00").getTime()
// const todayEndMilisecond = new Date(selectedDate + ":23:59:59").getTime()

// Vanila JS Datepicker 
const datepickerDOM = document.getElementById("datepicker");
const datepicker = new Datepicker(datepickerDOM, {
  // ...options
  format: "yyyy-mm-dd",
  todayHighlight: true,
  maxDate: "2200-12-31",
  minDate: "1990-01-01"
});


document.addEventListener("DOMContentLoaded", (e) => {
  getElement(".today.focused").classList.add("selected")
})


// Datepicker가 Selecte 되었을때 실행
const dateContainer = getElement(".datepicker-grid");
const todoLists = getElement(".todo-lists");

dateContainer.addEventListener("click", async (e) => {
  const milisecond = parseInt(e.target.dataset.date);
  const todoLists = getElement(".todo-lists");
  selectedDate = formatDate(milisecond).date
  selectedMilisecond = milisecond
  const dateStartMilisecond = new Date(selectedDate + ":00:00:00").getTime()
  const dateEndMilisecond = new Date(selectedDate + ":23:59:59").getTime()
  const todos = await fetchTodos(dateStartMilisecond, dateEndMilisecond);

  todoLists.innerHTML = todos
    .map((todo, index) => {
      return `
      <li class="todo-list">
        <div class="checkbox-wrapper-19">
          <input class="done-checkbox" type="checkbox" id="checkbox-${
            todo.id
          }" ${todo.done ? "checked" : "none"}/ name="checkbox-${todo.id}">
          <label for="checkbox-${todo.id}" class="check-box">
        </div>
        <div class="todo-title-group clickable" data-id="${todo.id}">
          <div class="list-number clickable" data-id="${todo.id}">${
        index + 1
      }</div>
          <h3 class="todo-title clickable" data-id="${todo.id}">${
        todo.title
      }</h3>
        </div>
        <div class="iconbtn-container" data-id="${todo.id}">
          <button class="icon-btn edit-btn" data-id="${
            todo.id
          }"><i class="fas fa-edit edit-btn"></i></button>
          <button class="icon-btn delete-btn" data-id="${
            todo.id
          }"><i class="fas fa-trash-alt delete-btn"></i></button>
        </div>
        </li>
        <hr>
    `;
    })
    .join("");
});

todoLists.addEventListener("click", (e) => {
  // List Item Clicked
  if (e.target.classList.contains("clickable")) {
    window.location.href = `http://localhost:5500/todo.html?id=${e.target.dataset.id}&mode=read`;
  }

  // Edit button Clicked
  else if (e.target.classList.contains("edit-btn")) {
    window.location.href = `http://localhost:5500/todo.html?id=${e.target.parentElement.dataset.id}&mode=update`;
  }

  // Delete button Clicked
  else if (e.target.classList.contains("delete-btn")) {
    // const promiseDelete = new Promise((res, rej) => {
    //   deleteTodo(e.target.parentElement.dataset.id)
    //   res("success")
    // })

    // promiseDelete
    //   .then((value) => {
    //     console.log("!")
    //     fetchTodos(selectedMilisecond)
    //   })

  }
});


//New Button이 클릭되었을때
const newBtn = getElement(".new-btn")
newBtn.addEventListener("click", (e) => {
  e.preventDefault()

  window.location.href = `http://localhost:5500/todo.html?selectedDate=${selectedDate}&mode=create`
})
