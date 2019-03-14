class Services {
  constructor() {}
  // modals type should be specific but not sure which
  modals: any = document.querySelectorAll(".modal");
  x: any = document.querySelectorAll(".modal__x");
  box1: HTMLElement = document.querySelector(".box--1");
  modal1: HTMLElement = document.querySelector(".modal--1");
  box2: HTMLElement = document.querySelector(".box--2");
  modal2: HTMLElement = document.querySelector(".modal--2");
  box3: HTMLElement = document.querySelector(".box--3");
  modal3: HTMLElement = document.querySelector(".modal--3");
  openModal(): void {
    this.box1.onclick = () => {
      this.modal1.style.display = "flex";
    };
    this.box2.onclick = () => {
      this.modal2.style.display = "flex";
    };
    this.box3.onclick = () => {
      this.modal3.style.display = "flex";
    };
  }
  closeModal(): void {
    window.onclick = event => {
      this.modals.forEach((modal: HTMLElement) => {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      });
    };
    this.x.forEach((x: HTMLElement) => {
      x.onclick = event => {
        this.modals.forEach((modal: HTMLElement) => {
          modal.style.display = "none";
        });
      };
    });
  }
}

export { Services };
