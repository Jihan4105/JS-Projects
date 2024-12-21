import formatDate from "../formatDate.js";
import { getElement, searchStringToObject } from "../utils.js";
import displayTodos from "../displayTodos.js";
import { deleteTodo, updateDone } from "../fetchTodo.js";
import initForm from "../initForm.js";

// GlobalVariables
const localStorage = window.localStorage
let selectedMilisecond = searchStringToObject(new URL(`${window.location.href}`)).date
let selectedDate = formatDate(parseInt(selectedMilisecond)).date
let deleteTodoId;
let dateStartMilisecond = new Date(selectedDate + ":00:00:00").getTime()
let dateEndMilisecond = new Date(selectedDate + ":23:59:59").getTime()
let fromStartMilisecond 
let toEndMilisecond

const localObj = {
  mode: "date",
  date: selectedDate,
  fromDate: selectedDate,
  toDate: selectedDate,
  searchString: "",
  radio: "all"
}

const overlay = getElement(".overlay")
const overlayContainer = getElement(".overlay-container")
const fromInput = getElement("#from")
const toInput = getElement("#to")
const todoLists = getElement(".todo-lists")
let rangePickerDOM
let singlePickerDOM

// LightPicker Singlepicker
const singleDatePicker = new Lightpick({
  // ...options
  field: document.getElementById('single-datepicker'),
  singleDate: true,
  inline: true,
  maxDate: "2200-12-31",
  minDate: "1990-01-01",
  lang: "eng",
  onSelect: () => {
    const milisecond = singleDatePicker.getDate()._i
    selectedMilisecond = typeof milisecond === "string" ? new Date(milisecond).getTime() : milisecond
    selectedDate = formatDate(milisecond).date

    localStorage.setItem("dateValue", selectedDate)
    localObj.date = selectedDate

    fromInput.value = selectedDate

    dateStartMilisecond = new Date(selectedDate + ":00:00:00").getTime()
    dateEndMilisecond = new Date(selectedDate + ":23:59:59").getTime()
    displayTodos(dateStartMilisecond, dateEndMilisecond, localObj.searchString, localObj.radio)
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
  onSelect: () => {
    const fromMilisecond = rangeDatePicker.getStartDate()._i
    const toMilisecond = rangeDatePicker.getEndDate() ? rangeDatePicker.getEndDate()._i : undefined

    fromInput.value = rangeDatePicker.toString("YYYY-MM-DD").slice(0, 10)
    toInput.value = toMilisecond ? rangeDatePicker.toString("YYYY-MM-DD").slice(13) : ""

    if(fromInput.value > toInput.value) {
      toInput.value = ""
    } 

    if(fromMilisecond && toMilisecond) {
      localStorage.setItem("fromValue", fromInput.value)
      localStorage.setItem("toValue", toInput.value)
      localObj.fromDate = fromInput.value
      localObj.toDate = toInput.value

      fromStartMilisecond = new Date(fromInput.value + ":00:00:00").getTime()
      toEndMilisecond = new Date(toInput.value + ":23:59:59").getTime()

      if(localObj.mode === "date") {
        displayTodos(dateStartMilisecond, dateEndMilisecond, localObj.searchString, localObj.radio)
      } else {
        displayTodos(fromStartMilisecond, toEndMilisecond, localObj.searchString, localObj.radio)
      }
    }
  }
});


// 로고이벤트 리스너 달아주기
const logo = getElement(".logo")
logo.addEventListener("click", () => window.location.href = `http://127.0.0.1:5500/index.html?date=${selectedMilisecond}`)

//페이지가 로딩 되었을때 실행
document.addEventListener("DOMContentLoaded", () => {
  const datePickers = document.querySelectorAll(".lightpick")
  const startMilisecond = (localObj.mode === "date") ? dateStartMilisecond : fromStartMilisecond
  const endMilisecond = (localObj.mode === "date") ? dateEndMilisecond : toEndMilisecond
  datePickers[0].classList.add("single-picker")
  datePickers[1].classList.add("range-picker")
  singlePickerDOM = getElement(".single-picker")
  rangePickerDOM = getElement(".range-picker")

  if(!localStorage.getItem("mode")) {
    localStorage.setItem("mode", "date")
    localStorage.setItem("dateValue", selectedDate)
    localStorage.setItem("fromValue", selectedDate)
    localStorage.setItem("toValue", selectedDate)
    localStorage.setItem("searchString", "")
    localStorage.setItem("radioValue", "all")
  }

  singleDatePicker.setDate(localObj.date)
  rangeDatePicker.setDateRange(localObj.fromDate, localObj.toDate)

  initForm(localObj, startMilisecond, endMilisecond)
})

// Filter Mode 스위칭 이벤트 핸들러
const modeRadioBtns = [...document.querySelectorAll(".mode-radio label span")]
modeRadioBtns.forEach((modeRadioBtn) => {
  modeRadioBtn.addEventListener("click", (e) => {
    if(e.target.previousSibling.previousSibling.id === "date-mode") {
      localStorage.setItem("mode", "date")
      localObj.mode = "date"

      singlePickerDOM.classList.add("show")
      rangePickerDOM.classList.remove("show")
      
      fromInput.value = localObj.date
      toInput.value = ""
      toInput.disabled = true;

      displayTodos(dateStartMilisecond, dateEndMilisecond, localObj.searchString, localObj.radio)
    } else{
      localStorage.setItem("mode", "fromTo")
      localObj.mode = "fromTo"

      rangePickerDOM.classList.add("show")
      singlePickerDOM.classList.remove("show")

      fromInput.value = localObj.fromDate
      toInput.value = localObj.toDate
      toInput.disabled = false

      displayTodos(fromStartMilisecond, toEndMilisecond, localObj.searchString, localObj.radio)
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
      } else {
        localStorage.setItem("radioValue", radioBtn.dataset.done)
        localObj.radio = radioBtn.dataset.done
      }
    })

    localObj.radio = e.target.dataset.done

    if(localObj.mode === "date") {
      displayTodos(dateStartMilisecond, dateEndMilisecond, localObj.searchString, localObj.radio)
    } else {
      displayTodos(fromStartMilisecond, toEndMilisecond, localObj.searchString, localObj.radio)
    }
  }
})

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
  localStorage.setItem("searchString", searchInput.value)
  localObj.searchString = searchInput.value

  if(localObj.mode === "date") {
    displayTodos(dateStartMilisecond, dateEndMilisecond, localObj.searchString, localObj.radio)
  } else {
    displayTodos(fromStartMilisecond, toEndMilisecond, localObj.searchString, localObj.radio)
  }
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