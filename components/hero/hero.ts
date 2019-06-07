import { ScrollEffect } from "../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/base";
import { Tween } from "../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/effects/tween/tween";
import { DistanceFunction } from "../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/distance-function";

class Hero {
  private scrollEffect_: ScrollEffect = null;
  private readonly scale_: number;
  private readonly hero_: HTMLElement;

  constructor(scale: number) {
    this.scale_ = scale;
    this.hero_ = document.querySelector(".hero");
  }

  startScrollEffect(): void {
    const translateY = ((this.scale_ - 1) / 2) * -100;
    this.scrollEffect_ = new ScrollEffect(
      this.hero_,
      {
        effects: [
          new Tween([
            [0, "transform: translateY(0) scale(1)"],
            [1, `transform: translateY(${translateY}%) scale(${this.scale_})`]
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

export { Hero };
