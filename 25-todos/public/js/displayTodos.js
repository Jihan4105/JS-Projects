import fetchTodos from "./fetchTodos.js";
import { getElement } from "./utils.js";
import formatDate from "./formatDate.js";

async function displayTodos(dateStartMilisecond, dateEndMilisecond, searchString, radioValue) {
  const todos = await fetchTodos(dateStartMilisecond, dateEndMilisecond);
  todos.sort((frontTodo, backTodo) => {
    return frontTodo.date - backTodo.date;
  })

  const todoLists = getElement(".todo-lists");
  let filteredTodos = todos

  filteredTodos = todos.filter((todo) => {
    if(
      todo.title.toLowerCase().includes(searchString) && 
      (radioValue === "all" || (todo.done).toString() === radioValue)
    ) return true
  })

  todoLists.innerHTML = filteredTodos
    .map((todo, index) => {
      return `
      <li class="todo-list">
        <div class="checkbox-wrapper-19">
          <input class="done-checkbox" type="checkbox" id="checkbox-${todo.id}" ${todo.done ? "checked" : "none"}/ name="checkbox-${todo.id}">
          <label for="checkbox-${todo.id}" class="check-box">
        </div>
        <div class="todo-title-group clickable" data-id="${todo.id}">
          <div class="list-number clickable" data-id="${todo.id}">${index + 1}</div>
          <h3 class="todo-title clickable" data-id="${todo.id}">
            ${todo.title}
            <span class="clickable" data-id="${todo.id}">${
              todo.allday ? 
                formatDate(todo.date, false).date + " : " + "Allday" :
                formatDate(todo.date, false).date + " : " + formatDate(todo.date, false).time
              }
            </span>
          </h3>
        </div>
        <div class="iconbtn-container" data-id="${todo.id}">
          <button class="icon-btn edit-btn" data-id="${todo.id}">
            <i class="fas fa-edit edit-btn"></i>
          </button>
          <button class="icon-btn delete-btn" data-id="${todo.id}">
            <i class="fas fa-trash-alt delete-btn"></i>
          </button>
        </div>
      </li>
      <hr>
    `;
    })
    .join("");
}

export default displayTodos