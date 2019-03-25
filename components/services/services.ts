import { ScrollEffect } from "../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/base";
import { Tween } from "../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/effects/tween/tween";
import { DistanceFunction } from "../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/distance-function";

class Services {
  private modals_: NodeListOf<Element> = document.querySelectorAll(".modal");
  private x_: NodeListOf<Element> = document.querySelectorAll(".modal__x");
  private boxes_: NodeListOf<Element> = document.querySelectorAll(".box");
  private scrollEffect_: ScrollEffect = null;
  constructor() {
    const boxes: NodeListOf<Element> = document.querySelectorAll(".box");
    boxes.forEach(box => {
      box.addEventListener("click", () => this.onClick(box));
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
  onClick(box: Element): void {
    const boxes: HTMLElement = document.querySelector(".boxes");
    boxes.classList.add("shrink");

    const one: HTMLElement = document.querySelector(".content--1");
    const two: HTMLElement = document.querySelector(".content--2");
    const three: HTMLElement = document.querySelector(".content--3");

    one.classList.remove("display");
    two.classList.remove("display");
    three.classList.remove("display");

    const index = box.className.length - 1;
    if (box.className[index] === "1") {
      one.classList.add("display");
    }
    if (box.className[index] === "2") {
      two.classList.add("display");
    }
    if (box.className[index] === "3") {
      three.classList.add("display");
    }
  }
}

export { Services };
