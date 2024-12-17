import formatDate from "../formatDate.js";
import fetchTodos from "../fetchTodos.js";
import { getElement } from "../utils.js";

const elem = document.getElementById('datepicker');
const datepicker = new Datepicker(elem, {
  // ...options
}); 

const dateContainer = getElement(".datepicker-grid")
const todoLists = getElement(".todo-lists")

dateContainer.addEventListener("click", async (e) => {
  const milisecond = parseInt(e.target.dataset.date)
  console.log(milisecond)
  const todoLists = getElement(".todo-lists")
  const todos = await fetchTodos(milisecond)

  todoLists.innerHTML = todos.map((todo, index) => {
    return `
      <li class="todo-list">
        <div class="checkbox-wrapper-19">
          <input class="done-checkbox" type="checkbox" id="checkbox-${todo.id}" ${todo.done ? "checked" : "none"}/ name="checkbox-${todo.id}">
          <label for="checkbox-${todo.id}" class="check-box">
        </div>
        <div class="todo-title-group clickable" data-id="${todo.id}">
          <div class="list-number clickable" data-id="${todo.id}">${index + 1}</div>
          <h3 class="todo-title clickable" data-id="${todo.id}">${todo.title}</h3>
        </div>
        <div class="iconbtn-container" data-id="${todo.id}">
          <button class="icon-btn edit-btn" data-id="${todo.id}"><i class="fas fa-edit edit-btn"></i></button>
          <button class="icon-btn delete-btn" data-id="${todo.id}"><i class="fas fa-trash-alt delete-btn"></i></button>
        </div>
        </li>
        <hr>
    `
  }).join("")
})

todoLists.addEventListener("click", (e) => {

  // List Item Clicked
  if (e.target.classList.contains("clickable")) {
    window.location.href = `http://localhost:5501/25-todos/todo.html?id=${e.target.dataset.id}&mode=read`
  }
  
  // Edit button Clicked
  else if(e.target.classList.contains("edit-btn")) {
    window.location.href = `http://localhost:5501/25-todos/todo.html?id=${e.target.parentElement.dataset.id}&mode=update`
  }
})

