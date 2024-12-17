export async function fetchTodo(id) {
  const response = await fetch(`http://localhost:3000/todos?id=${id}`)
  const todo = await response.json()

  return todo[0]
}

export async function UpdateTodo(id, newTodo) {
  try {
    const response = await fetch(`http://localhost:3000/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      body: JSON.stringify(newTodo)
    })

    if(response.redirected) {
      window.location.href = "http://location:5501/25-todos/index.html"
    }

    console.log(response)
  } catch (error) {
    console.log(error)
  }
}