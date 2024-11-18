const reviews = [
  {
    id: 1,
    name: "Susan Smith",
    job: "Web developer",
    img: "./images/person-1_rfzshl.jpg",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus odit illo in, suscipit dolor ullam ducimus laudantium totam id explicabo."
  } ,
  {
    id: 2,
    name: "Anna Jones",
    job: "Web developer",
    img: "./images/person-2_np9x5l.jpg",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus odit illo in, suscipit dolor ullam ducimus laudantium totam id explicabo."
  } ,
  {
    id: 3,
    name: "Peter Jones",
    job: "Web Programmer",
    img: "./images/person-3_ipa0mj.jpg",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus odit illo in, suscipit dolor ullam ducimus laudantium totam id explicabo."
  } ,
  {
    id: 4,
    name: "Bill Anderson",
    job: "the boss",
    img: "./images/person-4_t9nxjt.jpg",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus odit illo in, suscipit dolor ullam ducimus laudantium totam id explicabo."
  } 
];

const img = document.getElementById("person-img");
const author = document.getElementById("author");
const job = document.getElementById("job");
const info = document.getElementById("info");

const btnContainer = document.querySelector(".button-container")
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const randomBtn = document.querySelector(".random-btn");

let currentItem = 0;

window.addEventListener("DOMContentLoaded", function() {
  const item = reviews[currentItem];

  img.src = item.img;
  author.textContent = item.name;
  job.textContent = item.job;
  info.textContent = item.text;
})

// nextBtn.addEventListener("click", function () {
//   currentItem += 1;
//   if(currentItem > reviews.length - 1 ){ 
//     currentItem = 0;
//   }

//   showPerson(currentItem);
// })

// prevBtn.addEventListener("click", function () {
//   currentItem -= 1;
//   if(currentItem < 0 ){ 
//     currentItem = reviews.length - 1;
//   }

//   showPerson(currentItem);
// })

// randomBtn.addEventListener("click", () => {
//   currentItem = Math.floor(Math.random() * reviews.length);

//   showPerson(currentItem);
// })

btnContainer.addEventListener("click", (e) => {
  console.log(e.target.classList);

  if(e.target.classList.contains('prev-btn')){
    currentItem -= 1;
    if(currentItem < 0 ){ 
      currentItem = reviews.length - 1;
    }

    showPerson(currentItem);
  }
  else if (e.target.classList.contains('next-btn')){
    currentItem += 1;
    if(currentItem > reviews.length - 1 ){ 
      currentItem = 0;
    }

    showPerson(currentItem);
  }
  else {
    currentItem = Math.floor(Math.random() * reviews.length);

    showPerson(currentItem);  
  }
});

function showPerson(person) {
  const item = reviews[person];

  img.src = item.img;
  author.textContent = item.name;
  job.textContent = item.job;
  info.textContent = item.text;
}

