const value = document.querySelector("#value");
const buttons = document.querySelectorAll(".btn");
const container = document.querySelector(".button-container");

let count = 0;



// //Decrase Btn
// buttons[0].addEventListener("click", () => {
//   count--;
//   value.textContent = count;
//   value.style.color = "red";
// })

// //Reset Btn
// buttons[1].addEventListener("click", () => {
//   count = 0;
//   value.textContent = 0;
//   value.style.color = "#222";
// })

// //Increase Btn
// buttons[2].addEventListener("click", () => {
//   count++;
//   valuze.textContent = count;
//   value.style.color = "green";
// })





// buttons.forEach(btn => {
//   btn.addEventListener("click", (e) => {
//     const styles = e.currentTarget.classList;

//     count = 
//       styles.contains("decrease") ? --count : 
//       styles.contains("reset") ? 0 : ++count;

//     value.textContent = count;

//     value.style.color = 
//     (count > 0 ) ? "green" : 
//     (count < 0 ) ? "red" : "#222";
//   })
// });



// container.addEventListener("click", (e) => {
//   const styles = e.target.classList;
//   [count, color] = 
//     styles.contains("decrease") ? 
//       (count - 1 > 0 ) ? [--count, "green"] : 
//       (count - 1 < 0 ) ? [--count,"red"] : [--count,"#222"]
//     : 
//     styles.contains("reset") ? 
//       [0, "#222"] 
//     : 
//       (count + 1 > 0 ) ? [++count, "green"] : 
//       (count + 1 < 0 ) ? [++count,"red"] : [++count,"#222"];

//   value.textContent = count;

//   value.style.color = color;
// })

container.addEventListener("click", (e) => {
  const style = e.target.classList;
  console.log(style);
})