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
      redirect: "follow",
      body: JSON.stringify(newTodo),
    });

    window.location.href = "http://localhost:5500/index.html";

    console.log(response);
  } catch (error) {
    console.log(error);
  }
}
