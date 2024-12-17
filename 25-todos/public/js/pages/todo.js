import { getElement } from "../utils.js";
import formatDate from "../formatDate.js";
import { fetchTodo, UpdateTodo } from "../fetchTodo.js";

const loadingOverlay = getElement(".loading-overlay")
const todoContainer = getElement(".todo-container")

function init() {
  const url = new URL(`${window.location.href}`)
  const searchString = url.search.substring(1)

  // UrlSearchString을 Object로 변환 시켜준다.
  const urlParamsObject = JSON.parse(
    '{"' + searchString.replace(/&/g, '","').replace(/=/g,'":"') + '"}', 
    function(key, value) { return key===""?value:decodeURIComponent(value) }
  )
  
  const { id, mode } = urlParamsObject

  console.log(id, mode)

  switch(mode) {
    case "create" : createModeDisplay(); break;
    case "read" : readModeDisplay(id); break;
    case "update" : updateModeDisplay(id); break;
  }
}

// ReadMode
async function readModeDisplay(id) {
  const todo = await fetchTodo(id)
  const { date, time } = formatDate(todo.date, todo.allday)
  loadingOverlay.classList.remove("show")

  todoContainer.innerHTML = `
    <h1 class="todo-section-title">Review Schedule</h1>
    <form class="todo-form">
      <div class="time-input-box">
        <div class="time-input-group">
          <label for="todo-date">Date * </label>
          <input type="date" name="todo-date" id="todo-date" class="todo-date" value=${date} disabled>
        </div>
        <div class="time-input-group">
          <label for="todo-time">Time </label>
          <input type="time" name="todo-time" id="todo-time" class="todo-time" value=${time} disabled>
          <div class="checkbox-wrapper-19">
            <input class="allday-checkbox" type="checkbox" id="allday" name="allday" ${time ? "none" : "checked"} disabled/>
            <label for="allday" class="check-box">
            <span>AllDay</span>
          </div>
        </div>
      </div>
      <div class="title-input-group">
        <label for="todo-title">Title *</label>
        <input type="text" name="todo-title" id="todo-title" class="todo-title" value="${todo.title}" readonly>
      </div>
      <textarea name="todo-dsec" id="todo-dsec" class="todo-dsec" readonly>${todo.message}</textarea > 
      <div class="btn-container">
        <button class="btn submit-btn">Ok</button>
      </div>
    </form>
  `

  getElement(".submit-btn").addEventListener("click", (e) => {
    e.preventDefault()

    window.location.href="http://localhost:5501/25-todos/index.html"
  })
}

// UpdateMode
async function updateModeDisplay(id) {
  const todo = await fetchTodo(id)
  const { date, time } = formatDate(todo.date, todo.allday)
  loadingOverlay.classList.remove("show")

  todoContainer.innerHTML = `
    <h1 class="todo-section-title">Review Schedule</h1>
    <form class="todo-form">
      <div class="time-input-box">
        <div class="time-input-group">
          <label for="todo-date">Date * </label>
          <input type="date" name="todo-date" id="todo-date" class="todo-date" value=${date} >
        </div>
        <div class="time-input-group">
          <label for="todo-time">Time </label>
          <input type="time" name="todo-time" id="todo-time" class="todo-time" value=${time} ${time ? "none" : "disabled"}>
          <div class="checkbox-wrapper-19">
            <input class="allday-checkbox" type="checkbox" id="allday" name="allday" ${time ? "none" : "checked"} />
            <label for="allday" class="check-box">
            <span>AllDay</span>
          </div>
        </div>
      </div>
      <div class="title-input-group">
        <label for="todo-title">Title *</label>
        <input type="text" name="todo-title" id="todo-title" class="todo-title" value="${todo.title}" >
      </div>
      <textarea name="todo-dsec" id="todo-dsec" class="todo-dsec" >${todo.message}</textarea > 
      <div class="btn-container">
        <button class="btn submit-btn">Submit</button>
        <button class="btn cancel-btn">Cancel</button>
      </div>
    </form>
  `

  getElement(".submit-btn").addEventListener("click", (e) => {
    e.preventDefault()
    
    const dateValue = getElement(".todo-date").value
    const timeValue = getElement(".todo-time").value ? getElement(".todo-time").value : "00:00"
    const isTimeVoid = getElement(".todo-time").value ? false : true
    const newTitle = getElement(".todo-title").value
    const newText = getElement(".todo-dsec").value
    let newMilisecond

    //dateVale 를 Milisecond로 바꿔준다.
    const dateToMilisecond = (new Date(
      dateValue.slice(0, 4), 
      (dateValue.slice(5, 7) - "01").toString().padStart(2, "0"), 
      dateValue.slice(8, 10) 
    )).getTime()

    newMilisecond = 
      dateToMilisecond +
      parseInt(timeValue.slice(0, 2)) * 3600000 + 
      parseInt(timeValue.slice(3, 5)) * 60000

    const newTodo = {
      "id": id,
      "date": newMilisecond,
      "title": newTitle,
      "message": newText,
      "allday": isTimeVoid
    }

    UpdateTodo(id, newTodo)
  })
}

init()
