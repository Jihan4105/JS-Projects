const displayButtons = (container, activeIndex) => {
  let btns = [];
  let pageBtnIndex = [];

  if(activeIndex < 2) {
    pageBtnIndex = [1, 2, 3];
  }
  else if(activeIndex > 7) {
    pageBtnIndex = [8, 9, 10];
  }
  else {
    pageBtnIndex = [activeIndex, activeIndex + 1, activeIndex + 2]
  }

  pageBtnIndex.forEach((btnIndex) => {
    btns.push(
      `<button class="page-btn ${activeIndex + 1 == btnIndex ? "active-btn" : null }" data-index="${btnIndex - 1}">
        ${btnIndex}
      </button>`
    )
  })

  btns.push(
    `<button class="next-btn" name="next-btn">
      <i class="fas fa-chevron-right" name="next-btn"></i>
    </button>`
  )
  btns.push(
    `<button class="last-btn" name="last-btn" data-index="last">
      <i class="fas fa-angle-double-right" name="last-btn"></i>
    </button>`
  )
  btns.unshift(
    `<button class="prev-btn" name="prev-btn">
      <i class="fas fa-chevron-left" name="prev-btn"></i>
    </button>`
  )
  btns.unshift(
    `<button class="first-btn" name="first-btn" data-index="first">
      <i class="fas fa-angle-double-left" name="first-btn"></i>
    </button>`
  )

  container.innerHTML = btns.join("");
}

export default displayButtons