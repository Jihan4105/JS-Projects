function getElement(selection) {
  const element = document.querySelector(selection);

  if(element) {
    return element;
  }

  throw new Error(
    `Please check "${selection} selector, no such element exists` 
  );
}

class Gallery {
  constructor(element) {
    this.container = element;
    this.list = [...element.querySelectorAll(".img")];
    // target
    this.modal = getElement(".modal");
    this.modalImg = getElement(".main-img");
    this.imgName = getElement(".img-name");
    this.modalImages = getElement(".modal-images");
    this.closeBtn = getElement(".close-btn");
    this.nextBtn = getElement(".next-btn");
    this.prevBtn = getElement(".prev-btn");

    this.closeModal = this.closeModal.bind(this);
    this.nextImage = this.nextImage.bind(this);
    this.prevImage = this.prevImage.bind(this);
    this.chooseImage = this.chooseImage.bind(this);

    this.container.addEventListener("click", function(e) {
      if(e.target.classList.contains("img")) {
        this.openModal(e.target, this.list)
      }
    }.bind(this))
  }

  openModal (selectedImg, list) {
    this.setMainImage(selectedImg);
    this.modalImages.innerHTML = list.map(function (image) {
      return `<img src="${image.src}" title="${image.title}" 
      data-id="${image.dataset.id}" 
      class="${image.dataset.id === selectedImg.dataset.id ? 'modal-img selected' : 'modal-img'}"/>`
    }).join("");
    this.modal.classList.add("open")

    this.closeBtn.addEventListener("click", this.closeModal);
    this.nextBtn.addEventListener("click", this.nextImage);
    this.prevBtn.addEventListener("click", this.prevImage);
    this.modalImages.addEventListener("click", this.chooseImage);
  }

  setMainImage (selectedImg) {
    this.modalImg.src = selectedImg.src;
    this.imgName.textContent = selectedImg.title;
  }

  closeModal () {
    this.modal.classList.remove("open");

    this.closeBtn.removeEventListener("click", this.closeModal);
    this.nextBtn.removeEventListener("click", this.nextImage);
    this.prevBtn.removeEventListener("click", this.prevImage);
    this.modalImages.removeEventListener("click", this.chooseImage);
  }

  nextImage () {
    const selected = this.modalImages.querySelector(".selected");
    console.log()
    const next = selected.nextElementSibling || this.modalImages.firstElementChild;
    selected.classList.remove("selected");
    next.classList.add("selected");
    this.setMainImage(next);
  }

  prevImage () {
    const selected = this.modalImages.querySelector(".selected");
    const prev = selected.previousElementSibling || this.modalImages.lastElementChild;
    selected.classList.remove("selected");
    prev.classList.add("selected");
    this.setMainImage(prev);
  }

  chooseImage (e) {
    if(e.target.classList.contains("modal-img")) {
      const selected = this.modalImages.querySelector(".selected");
      selected.classList.remove("selected");
      this.setMainImage(e.target);
      e.target.classList.add("selected");
    }
  }
}

const nature = new Gallery(getElement(".nature"));
const city = new Gallery(getElement(".city"));