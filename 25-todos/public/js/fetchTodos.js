async function fetchTodos(milisecond) {
  const response = await fetch(`http://localhost:3000/todos?date=${milisecond}`)
  const todos = await response.json();

  console.log(todos)

  return todos
}

export default fetchTodos