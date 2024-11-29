const date = document.getElementById("date");
date.innerHTML = new Date().getFullYear();

const navToggle = document.querySelector(".nav-toggle")
const linksContainer = document.querySelector(".links-container");

const links = document.querySelector(".links")


// 햄버거 버튼을 눌렀을때 navbar를 toggle 해주는 함수.
navToggle.addEventListener("click",  () => {
  const linksHeight = links.getBoundingClientRect().height;
  const containerHeight = linksContainer.getBoundingClientRect().height;

  console.log(linksHeight,containerHeight);

  if(containerHeight === 0) {
    linksContainer.style.height = `${linksHeight}px`;
  } else {
    linksContainer.style.height = 0;
  } 
}) 


// FIXED NAVBAR

const navbar = document.getElementById("nav");
const topLink = document.querySelector(".top-link");

window.addEventListener("scroll", () => {
  const scrollHeight = window.scrollY;
  const navHeight = navbar.getBoundingClientRect().height;

  console.log(scrollHeight);

  if(scrollHeight > navHeight) {
    navbar.classList.add("fixed-nav")
  } else{
    navbar.classList.remove("fixed-nav")
  }

  //setup Top link
  if(scrollHeight > 500) {
    topLink.classList.add("show-links");
  } else {
    topLink.classList.remove("show-links");
  }
})


// SELECT LINK

const scrollLinks = document.querySelectorAll(".scroll-link");

scrollLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const id = e.currentTarget.getAttribute("href").slice(1);
    const element = document.getElementById(id);

    const navHeight = navbar.getBoundingClientRect().height;
    const containerHeight =  linksContainer.getBoundingClientRect().height;
    const fixedNav = navbar.classList.contains("fixed-nav");

    let position = element.offsetTop - navHeight;

    if(!fixedNav) {
      position = position - navHeight;
    }
    if(navHeight > 82) {
      position = position + containerHeight
    }

    window.scrollTo({
      let: 0,
      top: position,
    })

    linksContainer.style.height = 0;
  })
})