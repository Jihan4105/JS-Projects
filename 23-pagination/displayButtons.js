const displayButtons = (container, pages, activeIndex) => {
  let btns = [];

  if(activeIndex === 0 ) {
    btns.push(`<button class="page-btn active-btn" data-index="${activeIndex}">
      ${activeIndex+1}
    </button>`);
    btns.push(`<button class="page-btn" data-index="${activeIndex+1}">
      ${activeIndex+2}
    </button>`);
    btns.push(`<button class="page-btn" data-index="${activeIndex+2}">${activeIndex+3}</button>`);
  }
  else if(activeIndex === 9) {
    btns.push(`<button class="page-btn" data-index="${activeIndex-2}">
      ${activeIndex-1}
    </button>`);
    btns.push(`<button class="page-btn" data-index="${activeIndex-1}">
      ${activeIndex}
    </button>`);
    btns.push(`<button class="page-btn active-btn" data-index="${activeIndex}">${activeIndex+1}</button>`);
  }
  else {
    btns.push(`<button class="page-btn" data-index="${activeIndex-1}">
      ${activeIndex}
    </button>`);
    btns.push(`<button class="page-btn active-btn" data-index="${activeIndex}">
      ${activeIndex+1}
    </button>`);
    btns.push(`<button class="page-btn" data-index="${activeIndex+1}">${activeIndex+2}</button>`);
  }

  console.log(btns);

  // for(let i = activeIndex + 1 ; i < activeIndex + 4; i++) {
  //   if(i === 1) {
  //     btns.push(`<button class="page-btn active-btn" data-index="${i}">${i}</button>`)
  //     continue;
  //   }
  //   // else if( i === )
  //   btns.push(`<button class="page-btn" data-index="${i}">${i}</button>`)
  // }

  btns.push(`<button class="next-btn"><i class="fas fa-chevron-right"></i></button>`)
  btns.push(`<button class="last-btn" data-index="last"><i class="fas fa-angle-double-right"></i></button>`)
  btns.unshift(`<button class="prev-btn"><i class="fas fa-chevron-left"></i></button>`)
  btns.unshift(`<button class="first-btn" data-index="first"><i class="fas fa-angle-double-left"></i></button>`)
  container.innerHTML = btns.join("");
}

export default displayButtons