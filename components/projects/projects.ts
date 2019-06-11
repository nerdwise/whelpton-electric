import { loadImage } from '../../node_modules/toolbox-v2/src/toolbox/utils/loading/load-image';

class Projects {
  private images_: HTMLElement[];
  private modal_: HTMLElement;
  private x_: HTMLElement;

  constructor() {
    this.images_ = Array.from(document.querySelectorAll('.gallery__image'));
    this.modal_ = document.querySelector('.modal');
    this.x_ = document.querySelector('.modal__x');
  }

  public init(): void {
    this.openModalOnClick_();
  }

  private loadImage_(image: HTMLElement): void {
    this.modal_.classList.add('display');
    const modalImage: HTMLImageElement = document.querySelector(
      '.modal__image--' + image.dataset.target
    );
    const modalImageSrc: string = `/static/images/projects/projects${
      image.dataset.target
    }-min.jpg`;
    loadImage(modalImageSrc).then(() => {
      modalImage.src = modalImageSrc;
      modalImage.classList.add('display-image');
      this.closeModalOnClick_(modalImage);
    });
  }

  private openModalOnClick_(): void {
    this.images_.forEach(image => {
      image.addEventListener('click', () => {
        this.loadImage_(image);
      });
    });
  }

  private closeModalOnClick_(image: Element): void {
    window.addEventListener('click', event => {
      if (event.target == this.modal_) {
        this.modal_.classList.remove('display');
        image.classList.remove('display-image');
      }
    });
    this.x_.addEventListener('click', event => {
      this.modal_.classList.remove('display');
      image.classList.remove('display-image');
    });
  }
}

export { Projects };
