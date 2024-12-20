import formatDate from "../formatDate.js";
import { getElement, searchStringToObject } from "../utils.js";
import displayTodos from "../displayTodos.js";
import { deleteTodo, updateDone } from "../fetchTodo.js";
import dateModeEnabled from "../dateMode.js";
import fromToModeEnabled from "../FromToMode.js";

// GlobalVariables
let selectedMilisecond = searchStringToObject(new URL(`${window.location.href}`)).date
let selectedDate = formatDate(parseInt(selectedMilisecond)).date
let rangepickerDOM
let singlePickerDOM
let deleteTodoId;
let searchString = "";
let radioValue = "all";
let dateStartMilisecond = new Date(selectedDate + ":00:00:00").getTime()
let dateEndMilisecond = new Date(selectedDate + ":23:59:59").getTime()

const overlay = getElement(".overlay")
const overlayContainer = getElement(".overlay-container")
const fromInput = getElement("#from")
const toInput = getElement("#to")
const todoLists = getElement(".todo-lists")


// Vanila JS Datepicker 
// const datepickerDOM = document.getElementById("datepicker");
// const datepicker = new Datepicker(datepickerDOM, {
//   // ...options
//   format: "yyyy-mm-dd",
//   todayHighlight: true,
//   defaultViewDate: selectedDate,
//   maxDate: "2200-12-31",
//   minDate: "1990-01-01"
// });

// LightPicker Singlepicker
const singleDatePicker = new Lightpick({
  // ...options
  field: document.getElementById('single-datepicker'),
  singleDate: true,
  inline: true,
  maxDate: "2200-12-31",
  minDate: "1990-01-01",
  lang: "eng",
  onOpen: () => {
    const singlePickerDates = [...document.querySelectorAll(".lightpick__day")]
    singlePickerDates.forEach((singleDate) => {
      if(dateStartMilisecond <= singleDate.dataset.time && singleDate.dataset.time <= dateEndMilisecond) {
        singleDate.classList.add("is-start-date")
      }
    })
  },
  onSelect: () => {
    const milisecond = singleDatePicker.getDate()._i
    selectedDate = formatDate(milisecond).date
    selectedMilisecond = milisecond.toString()

    fromInput.value = selectedDate

    dateStartMilisecond = new Date(selectedDate + ":00:00:00").getTime()
    dateEndMilisecond = new Date(selectedDate + ":23:59:59").getTime()
    displayTodos(dateStartMilisecond, dateEndMilisecond, searchString, radioValue)
  }
});

// LightPicker Rangepicker
const rangeDatePicker = new Lightpick({ 
  // ...options
  field: document.getElementById('range-datepicker'),
  singleDate: false,
  inline: true,
  minDate: "1990-01-01",
  maxDate: "2200-12-31",
  lang: "eng",
  onOpen: () => {
    getElement(".is-today").classList.add("is-start-date")
    getElement(".is-today").classList.add("is-end-date")
    getElement(".is-today").classList.add("is-in-range")
  },
  onSelect: () => {
    const fromMilisecond = rangeDatePicker.getStartDate()._i
    const toMilisecond = rangeDatePicker.getEndDate() ? rangeDatePicker.getEndDate()._i : undefined

    fromInput.value = rangeDatePicker.toString("YYYY-MM-DD").slice(0, 10)
    toInput.value = toMilisecond ? rangeDatePicker.toString("YYYY-MM-DD").slice(13) : ""

    if(fromInput.value > toInput.value) {
      toInput.value = ""
    } 

    if(fromMilisecond && toMilisecond) {
      const fromStartMilisecond = new Date(fromInput.value + ":00:00:00").getTime()
      const toStartMilisecond = new Date(toInput.value + ":23:59:59").getTime()

      dateStartMilisecond = fromStartMilisecond
      dateEndMilisecond = toStartMilisecond

      displayTodos(dateStartMilisecond, dateEndMilisecond, searchString, radioValue)
    }
  }
});



// 로고이벤트 리스너 달아주기
const logo = getElement(".logo")
logo.addEventListener("click", () => window.location.href = `http://127.0.0.1:5500/index.html?date=${selectedMilisecond}`)

//페이지가 로딩 되었을때 실행
document.addEventListener("DOMContentLoaded", () => {
  // getElement(".datepicker-cell.focused").classList.add("selected")
  const url = new URL(`${window.location.href}`);
  const { date } = searchStringToObject(url)
  const formatedDate = formatDate(parseInt(date)).date
  const datePickers = document.querySelectorAll(".lightpick")
  datePickers[0].classList.add("single-picker")
  datePickers[1].classList.add("range-picker")
  singlePickerDOM = getElement(".single-picker")
  rangepickerDOM = getElement(".range-picker")

  dateModeEnabled(formatedDate)

  //todos리스트를 자동 불러오기
  dateStartMilisecond = new Date(formatedDate + ":00:00:00").getTime()
  dateEndMilisecond = new Date(formatedDate + ":23:59:59").getTime()

  displayTodos(dateStartMilisecond, dateEndMilisecond, searchString, radioValue)

})

// Filter Mode 스위칭 이벤트 핸들러러
const modeRadioBtns = [...document.querySelectorAll(".mode-radio label span")]
modeRadioBtns.forEach((modeRadioBtn) => {
  modeRadioBtn.addEventListener("click", (e) => {
    if(e.target.previousSibling.previousSibling.id === "date-mode") {
      dateModeEnabled(selectedDate)
    } else{
      fromToModeEnabled()
      rangeDatePicker.setDateRange(new Date(selectedDate), new Date(selectedDate))
    }
  })
})

// radio버튼 이벤트 핸들러
const radioBox = getElement(".radio-box")
radioBox.addEventListener("click", (e) => {
  if(e.target.classList.contains("radio")) {
    const radioBtnsArray = [...document.querySelectorAll(".radio-btn")]
    
    radioBtnsArray.forEach((radioBtn) => {
      if(e.target.classList.item(1) != radioBtn.classList.item(1)){
        radioBtn.checked = false
      }
    })

    radioValue = e.target.dataset.done

    displayTodos(dateStartMilisecond, dateEndMilisecond, searchString, radioValue)
  }
})

// Datepicker가 Select 되었을때 실행
// const dateContainer = getElement(".datepicker-grid");
// const todoLists = getElement(".todo-lists");
// dateContainer.addEventListener("click", (e) => {
//   const milisecond = parseInt(e.target.dataset.date);
//   selectedDate = formatDate(milisecond).date
//   selectedMilisecond = milisecond.toString()

//   fromInput.value = selectedDate

//   dateStartMilisecond = new Date(selectedDate + ":00:00:00").getTime()
//   dateEndMilisecond = new Date(selectedDate + ":23:59:59").getTime()
//   displayTodos(dateStartMilisecond, dateEndMilisecond, searchString, radioValue)
// });

// //ul에 event Listener 달아주기기
todoLists.addEventListener("click", (e) => {

  //doneCheckbox Clicked
  if (e.target.classList.contains("done-checkbox")) {
    const selectedTodoId = parseInt(e.target.getAttribute("id").slice(9))
    const updatedDoneValue = e.target.checked

    updateDone(selectedTodoId, updatedDoneValue)
  }

  // List Item Clicked
  else if (e.target.classList.contains("clickable")) {
    window.location.href = `http://localhost:5500/todo.html?id=${e.target.dataset.id}&mode=read&selectedMilisecond=${selectedMilisecond}`;
  }

  // Edit button Clicked
  else if (e.target.classList.contains("edit-btn")) {
    window.location.href = `http://localhost:5500/todo.html?id=${e.target.parentElement.dataset.id}&mode=update&selectedMilisecond=${selectedMilisecond}`;
  }

  // Delete button Clicked
  else if (e.target.classList.contains("delete-btn")) {
    deleteTodoId = e.target.parentElement.dataset.id
    overlay.classList.add("show")
    overlayContainer.classList.add("show")
  }
});


// New Button이 클릭되었을때
const newBtn = getElement(".new-btn")
newBtn.addEventListener("click", (e) => {
  e.preventDefault()

  window.location.href = `http://localhost:5500/todo.html?mode=create&selectedDate=${selectedDate}&selectedMilisecond=${selectedMilisecond}`
})

// SearchInput관련 핸들러
const searchInput = getElement(".search-input")
searchInput.addEventListener("keyup", (e) => {
  searchString = searchInput.value
  displayTodos(dateStartMilisecond, dateEndMilisecond, searchString, radioValue)
})

// DeleteModal 관련 핸들러들들
const secondDeleteButton = getElement(".second-dangerous-btn")
const returnToFormBtn = getElement(".return-btn")
secondDeleteButton.addEventListener("click", () => {
  deleteTodo(deleteTodoId, selectedDate)
})

returnToFormBtn.addEventListener("click", () => {
  overlay.classList.remove("show")
  overlayContainer.classList.remove("show")
})
