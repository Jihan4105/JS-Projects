let filteredProudcts = [...products];
const btnContainer = document.querySelector(".companies");
const productsContainer = document.querySelector(".products-container")
const searchInput = document.querySelector(".search-input");


window.addEventListener("DOMContentLoaded", () => {
  displayButtons();
  displayProducts(filteredProudcts);  
})

// Inputfield가 Update 즉 "keyup"이벤트가 발생할때마다 리스트 업데이트.
searchInput.addEventListener("keyup", () => {
  displayProducts(products.filter((product) => {
    return product.name.indexOf(searchInput.value.toLowerCase()) != -1;
  }));
})

//버튼을 만들어줌과 동시에 각 버튼에 eventHandler 달기
function displayButtons () {

  //new Set과 map 함수, spread 연산자를 이용한 필터링
  const buttons = ["all", ...new Set(products.map((product) => {
    return product.company;
  }))];

  //HTML을 만들어 버튼을 실제로 뿌려주는 코드.
  btnContainer.innerHTML = buttons.map((company) => {
    return `
      <button class="company-btn" data-id="${company}">${company}</button>
    `
  }).join("");

  btnContainer.addEventListener("click", (e) => {
    const company = e.target.dataset.id;
    if(company === "all") {
      displayProducts(products);
    }
    else if(company){
      filteredProudcts = products.filter((product) => {
        return company === product.company;
      })
      displayProducts(filteredProudcts);
    }
  })
}

function displayProducts (filteredProudcts) {
  productsContainer.innerHTML = filteredProudcts.map((product) => {
    return `
      <article class="product">
        <img src="${product.image}" alt="" class="product-img img">
        <footer>
          <h5 class="product-name">${product.name}</h5>
          <span class="product-price">${product.price}</span>
        </footer>
      </article>
    `
  }).join("");
}