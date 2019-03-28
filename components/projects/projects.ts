class Projects {
  images: HTMLElement[];
  modal: HTMLElement;
  constructor() {
    this.images = Array.from(document.querySelectorAll(".gallery__image"));
    this.modal = document.querySelector(".modal");
  }

  openModal(): void {
    this.images.forEach(image => {
      image.onclick = () => {
        this.modal.classList.add("display");
        const modalImage = document.querySelector("." + image.dataset.target);
        modalImage.classList.add("display");
        this.closeModal(modalImage);
      };
    });
  }

  closeModal(image: Element): void {
    window.onclick = event => {
      if (event.target == this.modal) {
        this.modal.classList.remove("display");
        image.classList.remove("display");
      }
    };
    const x: HTMLElement = document.querySelector(".modal__x");
    x.onclick = event => {
      this.modal.classList.remove("display");
      image.classList.remove("display");
    };
  }

  init(): void {
    this.openModal();
  }
}

export { Projects };
