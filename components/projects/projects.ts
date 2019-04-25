import { loadImage } from '../../node_modules/toolbox-v2/src/toolbox/utils/loading/load-image';

class Projects {
  images: HTMLElement[];
  modal: HTMLElement;
  constructor() {
    this.images = Array.from(document.querySelectorAll('.gallery__image'));
    this.modal = document.querySelector('.modal');
  }

  openModal(): void {
    this.images.forEach(image => {
      image.addEventListener('click', () => {
        this.modal.classList.add('display');
        const modalImage: HTMLImageElement = document.querySelector(
          '.modal__image--' + image.dataset.target
        );
        const modalImageSrc: string = `/static/images/projects/projects${
          image.dataset.target
        }-min.jpg`;
        loadImage(modalImageSrc).then(() => {
          modalImage.src = modalImageSrc;
          modalImage.classList.add('display-image');
          this.closeModal(modalImage);
        });
      });
    });
  }

  closeModal(image: Element): void {
    window.addEventListener('click', event => {
      if (event.target == this.modal) {
        this.modal.classList.remove('display');
        image.classList.remove('display-image');
      }
    });
    const x: HTMLElement = document.querySelector('.modal__x');
    x.addEventListener('click', event => {
      this.modal.classList.remove('display');
      image.classList.remove('display-image');
    });
  }

  init(): void {
    this.openModal();
  }
}

export { Projects };
