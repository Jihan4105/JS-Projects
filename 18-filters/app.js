let filteredProudcts = [...products];
const btnContainer = document.querySelector(".companies");
const productsContainer = document.querySelector(".products-container")
const searchInput = document.querySelector(".search-input");


window.addEventListener("DOMContentLoaded", () => {
  displayButtons();
  displayProducts(filteredProudcts);  
})

searchInput.addEventListener("keyup", () => {
  displayProducts(products.filter((product) => {
    return product.name.indexOf(searchInput.value.toLowerCase()) != -1;
  }));
})

function displayButtons () {
  const buttons = ["all", ...new Set(products.map((product) => {
    return product.company;
  }))];

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