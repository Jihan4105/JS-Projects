const productDOM = document.querySelector(".product")

const fetchProduct = () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const name = params.get("name");
  const age = params.get("age");

  // id에 해당되는 Data를 추출.
  
  const product = productList.find((product) => product.id === id);

  return product;
}

const displayProducts = (product) => {

  const {
    company,
    colors,
    name: title,
    price,
    image 
  } = product.fields;

  const {url: img} = image[0];

  document.title = title.toUpperCase();

  const colorsList = colors.map((color) => {
    return `
      <span class="product-color" style="background: ${color}"></span>
    `
  }).join("");

  productDOM.innerHTML = `
    <div class="product-wrapper">
      <img src="${img}" class="img" alt="${title}" />
      <div class="product-info">
        <h3>${title}</h3>
        <h5>${company}</h5>
        <span>${price / 100}</span>
        <div class="colors">
          ${colorsList}
        </div>
        <button class="btn">Add to Cart</button>
      </div>
    </div>
  `
}

const start = () => {
  const data = fetchProduct();
  displayProducts(data);
}

start();