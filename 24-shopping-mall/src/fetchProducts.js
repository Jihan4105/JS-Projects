const products = [
  {
    id: 'rec43w3ipXvP28vog',
    featured: true,
    name: 'high-back bench',
    colors: ["#f15025", "#222"],
    company: 'ikea',
    image:
      './images/product-1.jpeg',
    price: 999,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, possimus labore. Quasi quibusdam assumenda voluptatum alias distinctio officiis possimus molestias!",
  },
  {
    id: 'rec4f2RIftFCb7aHh',
    featured: false,
    name: 'albany table',
    colors: ["#f15025", "#222"],
    company: 'marcos',
    image:
      './images/product-2.jpeg',
    price: 7999,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, possimus labore. Quasi quibusdam assumenda voluptatum alias distinctio officiis possimus molestias!",
  },
  {
    id: 'rec8kkCmSiMkbkiko',
    featured: false,
    name: 'accent chair',
    colors: ["#222","#0000ff","#f15025"],
    company: 'caressa',
    image:
      './images/product-3.jpeg',
    price: 2599,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, possimus labore. Quasi quibusdam assumenda voluptatum alias distinctio officiis possimus molestias!",
  },
  {
    id: 'recBohCqQsot4Q4II',
    featured: false,
    name: 'wooden table',
    colors: ["#ff0000","#0000ff"],
    company: 'caressa',
    image:
      './images/product-4.jpg',
    price: 4599,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, possimus labore. Quasi quibusdam assumenda voluptatum alias distinctio officiis possimus molestias!",
  },
  {
    id: 'recDG1JRZnbpRHpoy',
    featured: false,
    name: 'dining table',
    colors: ["#ff0000","#f15025"],
    company: 'caressa',
    image:
      './images/product-5.jpg',
    price: 699,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, possimus labore. Quasi quibusdam assumenda voluptatum alias distinctio officiis possimus molestias!",
  },
  {
    id: 'recNWGyP7kjFhSqw3',
    featured: false,
    name: 'sofa set',
    colors: ["#0000ff"],
    company: 'liddy',
    image:
      './images/product-6.jpeg',
    price: 6999,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, possimus labore. Quasi quibusdam assumenda voluptatum alias distinctio officiis possimus molestias!",
  },
  {
    id: 'recZEougL5bbY4AEx',
    featured: false,
    name: 'modern bookshelf',
    colors: ["#00ff00", "#f15025", "#ff0000"],
    company: 'marcos',
    image:
      './images/product-7.jpg',
    price: 899,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, possimus labore. Quasi quibusdam assumenda voluptatum alias distinctio officiis possimus molestias!",
  },
  {
    id: 'recjMK1jgTb2ld7sv',
    featured: false,
    name: 'emperor bed',
    colors: ["#f15025"],
    company: 'liddy',
    image:
      './images/product-8.jpg',
    price: 2199,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, possimus labore. Quasi quibusdam assumenda voluptatum alias distinctio officiis possimus molestias!",
  },
  {
    id: 'recmg2a1ctaEJNZhu',
    featured: true,
    name: 'utopia sofa',
    colors: ["#00ff00", "#0000ff"],
    company: 'marcos',
    image:
      './images/product-9.jpg',
    price: 3995,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, possimus labore. Quasi quibusdam assumenda voluptatum alias distinctio officiis possimus molestias!",
  },
  {
    id: 'recvKMNR3YFw0bEt3',
    featured: true,
    name: 'entertainment center',
    colors: ["#ff0000","#00ff00"],
    company: 'liddy',
    image:
      './images/product-10.jpg',
    price: 2998,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, possimus labore. Quasi quibusdam assumenda voluptatum alias distinctio officiis possimus molestias!",
  },
  {
    id: 'recxaXFy5IW539sgM',
    featured: false,
    name: 'albany sectional',
    colors: ["#00ff00", "#ff0000"],
    company: 'ikea',
    image: './images/product-11.jpeg',
    price: 1099,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, possimus labore. Quasi quibusdam assumenda voluptatum alias distinctio officiis possimus molestias!",
  },
  {
    id: 'recyqtRglGNGtO4Q5',
    featured: false,
    name: 'leather sofa',
    colors: ["#222"],
    company: 'liddy',
    image: './images/product-12.jpg',
    price: 999,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, possimus labore. Quasi quibusdam assumenda voluptatum alias distinctio officiis possimus molestias!",
  },
];

const fetchProducts = async () => {
  return products
}

export const fetchProduct = async (id) => {
  return products.find((product) => {
    return product.id === id
  })
}

export default fetchProducts