const productsDOM = document.querySelector(".products-center");

const displayProducts = (list) => {
  const productList = list.map((product) => {
    const {id} = product;
    const {name: title, price} = product.fields;
    const {url: img} = product.fields.image[0];
    const formatPrice = price / 100;


    return `
      <a class="single-product" href="product.html?id=${id}&name=john&age=25">
        <img src="${img}" class="single-product-img img" alt="${title}"/>
        <footer>
          <h5 class="name">${title}</h5>
          <span class="price">$${formatPrice}</span>
        </footer>
      </a>
    `
  }).join("");

  productsDOM.innerHTML = `
    <div class="products-container">
      ${productList}  
    </div>
  `
}

displayProducts(productList);