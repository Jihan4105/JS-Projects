import { getElement, searchStringToObject } from "../utils.js";
import formatDate from "../formatDate.js";
import { fetchTodo } from "../fetchTodo.js";
import showWorkCheckModal from "../showCheckModal.js";
import alldayCheckBoxHandler from "../todo/alldayCheckbox.js"
import noTitleErrorHandler from "../todo/notitleError.js";
import submitBtnHandler from "../todo/submitBtn.js";

const loadingOverlay = getElement(".loading-overlay");
const todoContainer = getElement(".todo-container");

function init() {
  const url = new URL(`${window.location.href}`);
  const urlParamsObject = searchStringToObject(url)
  console.log(urlParamsObject)
  const { id, mode, selectedDate, selectedMilisecond } = urlParamsObject;

  // 로고이벤트 리스너 달아주기
  const logo = getElement(".logo")
  logo.addEventListener("click", () => window.location.href = `http://127.0.0.1:5500/index.html?date=${selectedMilisecond}`)


  switch (mode) {
    case "create":
      createModeDisplay(selectedDate);
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
function createModeDisplay(selectedDate) {
  loadingOverlay.classList.remove("show");

  todoContainer.innerHTML = `
    <h1 class="todo-section-title">Create New Schedule</h1>
    <form class="todo-form">
      <div class="time-input-box">
        <div class="time-input-group">
          <label for="todo-date">Date </label>
          <input type="date" name="todo-date" id="todo-date" class="todo-date" value=${selectedDate} >
        </div>
        <div class="time-input-group">
          <label for="todo-time">Time </label>
          <input type="time" name="todo-time" id="todo-time" class="todo-time" value="00:00" />
          <div class="checkbox-wrapper-19">
            <input class="allday-checkbox" type="checkbox" id="allday" name="allday" />
            <label for="allday" class="check-box">
            <span>AllDay</span>
          </div>
        </div>
      </div>
      <div class="title-input-group">
        <label for="todo-title">Title *</label>
        <input type="text" name="todo-title" id="todo-title" class="todo-title" value="" placeholder="Your title...">
        <span class="title-error">Invalid Title</span>
      </div>
      <textarea name="todo-dsec" id="todo-dsec" class="todo-dsec" placeholder="Your text..."></textarea > 
      <div class="btn-container">
        <button class="btn submit-btn">Submit</button>
        <button class="btn dangerous-btn first-dangerous-btn">Cancel</button>
      </div>
    </form>
  `;

  //allday-checkbox가 클릭되었을때 timeInput의 속성과 값을 핸들링한다
  alldayCheckBoxHandler()

  //Title이 빈칸일때 errorMessage 보이기
  noTitleErrorHandler()

  //생성취소소를 클릭하였을때 발생하는 이벤트들
  showWorkCheckModal(selectedDate)

  //Submit버튼을 눌렀을때
  submitBtnHandler("create")
}

// ReadMode
async function readModeDisplay(id) {
  const todo = await fetchTodo(id);
  const { date, time } = formatDate(todo.date, todo.allday);
  const milisecond = new Date(date).getTime()
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

    window.location.href = `http://localhost:5500/index.html?date=${milisecond}`;
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
          <input type="time" name="todo-time" id="todo-time" class="todo-time" value=${time ? time : "00:00"} ${time ? "none" : "disabled"}>
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
        <span class="title-error">Invalid Title</span>
      </div>
      <textarea name="todo-dsec" id="todo-dsec" class="todo-dsec" >
        ${todo.message}
        </textarea > 
      <div class="btn-container">
        <button class="btn submit-btn">Submit</button>
        <button class="btn dangerous-btn first-dangerous-btn">Cancel</button>
      </div>
    </form>
  `;
  
  //allday-checkbox가 클릭되었을때 timeInput의 속성과 값을 핸들링한다
  alldayCheckBoxHandler()

  //Title이 빈칸일때 errorMessage 보이기
  noTitleErrorHandler()

  //수정취소를 클릭하였을때 발생하는 이벤트들
  showWorkCheckModal(date)

  //Submit버튼을 눌렀을때
  submitBtnHandler("update", id, todo.done)
}


init();
