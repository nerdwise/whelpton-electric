import { ScrollEffect } from "../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/base";
import { Tween } from "../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/effects/tween/tween";
import { DistanceFunction } from "../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/distance-function";

class Services {
  private modals_: NodeListOf<Element> = document.querySelectorAll(".modal");
  private x_: NodeListOf<Element> = document.querySelectorAll(".modal__x");
  private boxes_: NodeListOf<Element> = document.querySelectorAll(".box");
  private scrollEffect_: ScrollEffect = null;
  constructor() {}
  openModal(): void {
    this.boxes_.forEach((box: HTMLElement) => {
      box.onclick = () => {
        const target = box.dataset.target;
        const modal: HTMLElement = document.querySelector(`.${target}`);
        modal.classList.toggle("open");
      };
    });
  }
  closeModal(): void {
    window.onclick = event => {
      this.modals_.forEach((modal: HTMLElement) => {
        if (event.target == modal) {
          modal.classList.remove("open");
        }
      });
    };
    this.x_.forEach((x: HTMLElement) => {
      x.onclick = event => {
        const target = x.dataset.target;
        const modal: HTMLElement = document.querySelector(`.${target}`);
        modal.classList.remove("open");
      };
    });
  }
  startScrollEffect(): void {
    this.scrollEffect_ = new ScrollEffect(
      <HTMLElement>document.querySelector(".boxes"),
      {
        effects: [
          new Tween([
            [0, "transform: translateY(25%)"],
            [1, "transform: translateY(0)"]
          ])
        ],
        getDistanceFunction: DistanceFunction.DOCUMENT_SCROLL,
        startDistance: 0,
        endDistance: function endDistance() {
          return window.innerHeight / 2;
        }
      }
    );
  }
}

export { Services };
