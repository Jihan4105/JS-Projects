import { searchStringToObject } from "./utils.js";

export async function fetchTodo(id) {
  const response = await fetch(`http://localhost:3000/todos?id=${id}`);
  const todo = await response.json();

  return todo[0];
}

export async function updateTodo(id, newTodo) {
  try {
    const response = await fetch(`http://localhost:3000/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });

    window.location.href = `http://localhost:5500/index.html?date=${newTodo.date}`;

    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

export async function createTodo(todo) {
  try {
    const response = await fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });

    window.location.href = `http://localhost:5500/index.html?date=${todo.date}`
    console.log(response)
  } catch (error) {
    console.log(error)
  }
}

export async function deleteTodo(id) {
  try {
    const response = await fetch(`http://localhost:3000/todos/${id}`, {
      method: "DELETE"
    })
    
    window.location.reload(true)

    window.location.href
    console.log(response)
  } catch (error) {
    console.log(error)
  }
}
