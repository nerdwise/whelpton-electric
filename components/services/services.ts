class Services {
  constructor() {}
  modals: NodeListOf<Element> = document.querySelectorAll(".modal");
  x: NodeListOf<Element> = document.querySelectorAll(".modal__x");
  boxes: NodeListOf<Element> = document.querySelectorAll(".box");
  openModal(): void {
    this.boxes.forEach((box: HTMLElement) => {
      box.onclick = () => {
        const target = box.dataset.target;
        const modal: HTMLElement = document.querySelector(`.${target}`);
        modal.classList.toggle("open");
      };
    });
  }
  closeModal(): void {
    window.onclick = event => {
      this.modals.forEach((modal: HTMLElement) => {
        if (event.target == modal) {
          modal.classList.remove("open");
        }
      });
    };
    this.x.forEach((x: HTMLElement) => {
      x.onclick = event => {
        const target = x.dataset.target;
        const modal: HTMLElement = document.querySelector(`.${target}`);
        modal.classList.remove("open");
      };
    });
  }
}

export { Services };
