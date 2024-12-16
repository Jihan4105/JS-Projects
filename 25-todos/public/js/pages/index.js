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
        <div class="iconbtn-container">
          <button class="icon-btn edit-btn"><i class="fas fa-edit"></i></button>
          <button class="icon-btn delete-btn"><i class="fas fa-trash-alt"></i></button>
        </div>
        </li>
        <hr>
    `
  }).join("")
})

// function renderTodo (id) {
//   console.log(id)

//   window.location.href = `http://localhost:5001/25-todos/todo.html?id=${id}`
// }

todoLists.addEventListener("click", (e) => {
  if (e.target.classList.contains("clickable")) {
    window.location.href = `http://localhost:5501/25-todos/todo.html?id=${e.target.dataset.id}`
  }
})