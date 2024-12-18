import { getElement } from "../utils.js";
import formatDate from "../formatDate.js";
import { fetchTodo, updateTodo } from "../fetchTodo.js";

const loadingOverlay = getElement(".loading-overlay");
const todoContainer = getElement(".todo-container");

function init() {
  const url = new URL(`${window.location.href}`);
  const searchString = url.search.substring(1);

  // UrlSearchString을 Object로 변환 시켜준다.
  const urlParamsObject = JSON.parse(
    '{"' + searchString.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
    function (key, value) {
      return key === "" ? value : decodeURIComponent(value);
    }
  );

  const { id, mode } = urlParamsObject;

  switch (mode) {
    case "create":
      createModeDisplay();
      break;
    case "read":
      readModeDisplay(id);
      break;
    case "update":
      updateModeDisplay(id);
      break;
  }
}

// CreateMode
async function createModeDisplay() {
  
}

// ReadMode
async function readModeDisplay(id) {
  const todo = await fetchTodo(id);
  const { date, time } = formatDate(todo.date, todo.allday);
  loadingOverlay.classList.remove("show");

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
          <input type="time" name="todo-time" id="todo-time" class="todo-time" value=${time ? time : "00:00" } disabled>
          <div class="checkbox-wrapper-19">
            <input class="allday-checkbox" type="checkbox" id="allday" name="allday" ${
              time ? "none" : "checked"
            } disabled/>
            <label for="allday" class="check-box">
            <span>AllDay</span>
          </div>
        </div>
      </div>
      <div class="title-input-group">
        <label for="todo-title">Title *</label>
        <input type="text" name="todo-title" id="todo-title" class="todo-title" value="${
          todo.title
        }" readonly>
      </div>
      <textarea name="todo-dsec" id="todo-dsec" class="todo-dsec" readonly>${
        todo.message
      }</textarea > 
      <div class="btn-container">
        <button class="btn submit-btn">Ok</button>
      </div>
    </form>
  `;

  getElement(".submit-btn").addEventListener("click", (e) => {
    e.preventDefault();

    window.location.href = "http://localhost:5500/index.html";
  });
}

// UpdateMode
async function updateModeDisplay(id) {
  const todo = await fetchTodo(id);
  const { date, time } = formatDate(todo.date, todo.allday);
  loadingOverlay.classList.remove("show");

  todoContainer.innerHTML = `
    <h1 class="todo-section-title">Update Schedule</h1>
    <form class="todo-form">
      <div class="time-input-box">
        <div class="time-input-group">
          <label for="todo-date">Date </label>
          <input type="date" name="todo-date" id="todo-date" class="todo-date" value=${date} >
        </div>
        <div class="time-input-group">
          <label for="todo-time">Time </label>
          <input type="time" name="todo-time" id="todo-time" class="todo-time" value=${time ? time : "00:00"} ${
    time ? "none" : "disabled"
  }>
          <div class="checkbox-wrapper-19">
            <input class="allday-checkbox" type="checkbox" id="allday" name="allday" ${
              time ? "none" : "checked"
            } />
            <label for="allday" class="check-box">
            <span>AllDay</span>
          </div>
        </div>
      </div>
      <div class="title-input-group">
        <label for="todo-title">Title *</label>
        <input type="text" name="todo-title" id="todo-title" class="todo-title" value="${
          todo.title
        }" >
        <span class="title-error">Invalid Title</span>
      </div>
      <textarea name="todo-dsec" id="todo-dsec" class="todo-dsec" >${
        todo.message
      }</textarea > 
      <div class="btn-container">
        <button class="btn submit-btn">Submit</button>
        <button class="btn dangerous-btn first-dangerous-btn">Cancel</button>
      </div>
    </form>
  `;
  
  //allday-checkbox가 클릭되었을때 timeInput의 속성과 값을 핸들링한다
  const alldayCheckBox = getElement(".allday-checkbox")
  alldayCheckBox.addEventListener("click", (e) => {
    const todoTime = getElement(".todo-time")

    if(e.target.checked === true) {
      todoTime.value = "00:00"
      todoTime.disabled = true
    } else {
      todoTime.removeAttribute("disabled")
    }
  })

  //Title이 빈칸일때 errorMessage 보이기
  const todoTitle = getElement(".todo-title") 
  todoTitle.addEventListener("keyup", (e) => {
    const titleErrorDOM = getElement(".title-error")

    if(!todoTitle.value) {
      todoTitle.classList.add("error")
      titleErrorDOM.classList.add("show")
    } else {
      todoTitle.classList.remove("error")
      titleErrorDOM.classList.remove("show")
    }
  })

  //수정취소를 클릭하였을때 발생하는 이벤트들
  const firstCancelBtn = getElement(".first-dangerous-btn")
  const secondCancelBtn = getElement(".second-dangerous-btn")
  const returnToFormBtn = getElement(".return-btn")
  const todoOverlay = getElement(".todo-overlay")
  const todoOverlayContainer = getElement(".todo-overlay-container")
  firstCancelBtn.addEventListener("click", (e) => {
    e.preventDefault()

    todoOverlay.classList.add("show")
    todoOverlayContainer.classList.add("show")
  })

  secondCancelBtn.addEventListener("click", () => {
    console.log("!")
    window.location.href = "http://localhost:5500/index.html"
  })

  returnToFormBtn.addEventListener("click", () => {
    todoOverlay.classList.remove("show")
    todoOverlayContainer.classList.remove("show")
  })

  //Submit버튼을 눌렀을때
  const updateSubmitBtn = getElement(".submit-btn")
  updateSubmitBtn.addEventListener("click", (e) => {
    e.preventDefault()

    const todoTitle = getElement(".todo-title")
    if(!todoTitle.value) {
      todoTitle.focus()
    } 
    else {
      const dateValue = getElement(".todo-date").value;
      const timeValue = getElement(".todo-time").value
      const isAlldayEnabled = alldayCheckBox.checked
      const newTitle = getElement(".todo-title").value;
      const newText = getElement(".todo-dsec").value;
      let newMilisecond;
  
      //dateVale 를 Milisecond로 바꿔준다.
      const dateToMilisecond = new Date(
        dateValue.slice(0, 4),
        (dateValue.slice(5, 7) - "01").toString().padStart(2, "0"),
        dateValue.slice(8, 10)
      ).getTime();
  
      newMilisecond =
        dateToMilisecond +
        parseInt(timeValue.slice(0, 2)) * 3600000 +
        parseInt(timeValue.slice(3, 5)) * 60000;
  
      const newTodo = {
        id: id,
        date: newMilisecond,
        title: newTitle,
        message: newText,
        done: todo.done,
        allday: isAlldayEnabled
      };
  
      updateTodo(id, newTodo);
    }

  });
}


init();
