const getElement = (selector) => {
  const element = document.querySelector(selector);

  if(element){
    return element;
  }

  throw new Error("Element not exsit");
} 

export default getElement;