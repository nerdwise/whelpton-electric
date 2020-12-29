class Projects {
  images: HTMLImageElement[];
  modalImage: HTMLImageElement;
  modal: HTMLElement;
  constructor() {
    this.images = Array.from(document.querySelectorAll('.gallery__image'));
    this.modal = document.querySelector('.modal');
    this.modalImage = document.querySelector('.modal__image');
  }

  handleModalOpening(): void {
    this.images.forEach(image => {
      image.addEventListener('click', () => {
        this.modal.classList.add('display');
        this.modalImage.src = image.src;
        this.modalImage.alt = image.alt;
      });
    });
  }

  handleModalClosing(): void {
    window.addEventListener('click', event => {
      if (event.target == this.modal) {
        this.modal.classList.remove('display');
      }
    });
    const x: HTMLElement = document.querySelector('.modal__x');
    x.addEventListener('click', event => {
      this.modal.classList.remove('display');
    });
  }

  init(): void {
    this.handleModalOpening();
    this.handleModalClosing();
  }
}

export { Projects };
