class Projects {
  assets: Array<HTMLImageElement|HTMLVideoElement>;
  modalImage: HTMLImageElement;
  modalVideo: HTMLVideoElement;
  modal: HTMLElement;
  modalCaption: HTMLElement;
  constructor() {
    this.assets = Array.from(document.querySelectorAll('.gallery__image'));
    this.modal = document.querySelector('.modal');
    this.modalImage = document.querySelector('.modal__image');
    this.modalVideo = document.querySelector('.modal__video');
    this.modalCaption = document.querySelector('.modal__caption');
  }

  handleModalOpening(): void {
    this.assets.forEach((asset) => {
      asset.addEventListener('click', () => {
        this.modal.classList.add('display');
        if (asset instanceof HTMLImageElement) {
          this.modalVideo.style.display = 'none';
          this.modalImage.style.display = '';
          this.modalImage.src = asset.src;
          this.modalImage.alt = asset.alt;
          this.modalCaption.innerText = asset.alt;
        } else {
          this.modalImage.style.display = 'none';
          this.modalVideo.style.display = '';
          this.modalVideo.innerHTML = '';
          this.modalVideo.innerHTML = asset.innerHTML;
          this.modalVideo.setAttribute(
            'aria-label', asset.getAttribute('aria-label'));
          this.modalCaption.innerText = asset.getAttribute('aria-label');
          this.modalVideo.load();
        }
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
    if (x) {
      x.addEventListener('click', event => {
        this.modal.classList.remove('display');
      });
    }
  }

  init(): void {
    this.handleModalOpening();
    this.handleModalClosing();
  }
}

export { Projects };
