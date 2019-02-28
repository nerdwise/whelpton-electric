import { ScrollEffect } from "../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/base";
import { Tween } from "../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/effects/tween/tween";
import { DistanceFunction } from "../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/distance-function";

class Hero {
  private scrollEffect_: ScrollEffect = null;
  constructor() {}
  startScrollEffect(): void {
    this.scrollEffect_ = new ScrollEffect(
      <HTMLElement>document.querySelector(".hero__background"),
      {
        effects: [
          new Tween([
            [0, "transform: translateY(0) scale(1)"],
            [1, "transform: translateY(-5%) scale(1.1)"]
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
