async function fetchTodos(dateStartMilisecond, dateEndMilisecond) {
  // http://localhost:3000/todos?id_gte=4 4 이상
  // http://localhost:3000/todos?id_lte=6 6 이하
  const response = await fetch(`http://localhost:3000/todos?date_gte=${dateStartMilisecond}&date_lte=${dateEndMilisecond}`)
  const todos = await response.json();

  return todos
}

export default fetchTodos