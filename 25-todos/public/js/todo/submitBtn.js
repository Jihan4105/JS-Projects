import { updateTodo, createTodo } from "../fetchTodo.js";
import { getElement } from "../utils.js";

//Submit버튼을 눌렀을때
function submitBtnHandler(mode, id, isDoneTodo) {
  const submitBtn = getElement(".submit-btn")
  submitBtn.addEventListener("click", (e) => {
    e.preventDefault()
  
    const todoTitle = getElement(".todo-title")
    if(!todoTitle.value) {
      todoTitle.focus()
    } 
    else {
      const dateValue = getElement(".todo-date").value;
      const timeValue = getElement(".todo-time").value
      const isAlldayEnabled = getElement(".allday-checkbox").checked
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
      
      if(mode === "update") {
        updateTodo(id, {
          date: newMilisecond,
          title: newTitle,
          message: newText,
          done: isDoneTodo,
          allday: isAlldayEnabled
        }) 
      } 
      else if(mode === "create") {
        createTodo({
          date: newMilisecond,
          title: newTitle,
          message: newText,
          done: false,
          allday: isAlldayEnabled
        })
      }
    }
  });
}

export default submitBtnHandler