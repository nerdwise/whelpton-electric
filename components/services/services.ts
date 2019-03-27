import { ScrollEffect } from "../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/base";
import { Tween } from "../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/effects/tween/tween";
import { DistanceFunction } from "../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/distance-function";
import { Carousel } from "../../node_modules/toolbox-v2/src/toolbox/components/carousel/carousel";
import { CarouselNav } from "../../node_modules/toolbox-v2/src/toolbox/components/carousel/nav";
import { CarouselTimer } from "../../node_modules/toolbox-v2/src/toolbox/components/carousel/timer";

class Services {
  private carousel_: Carousel = null;
  private carouselTimer_: CarouselTimer = null;
  private carouselNav_: CarouselNav = null;
  private scrollEffect_: ScrollEffect = null;

  constructor() {
    const boxes: NodeListOf<Element> = document.querySelectorAll(".box");
    boxes.forEach((box) => {
      const oneTimeInit = () => {
        this.init();
        this.shrink();
        box.removeEventListener("click", oneTimeInit);
      };
      box.addEventListener("click", oneTimeInit);
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

  shrink(): void {
    const boxes: HTMLElement = document.querySelector(".boxes");
    boxes.classList.add("shrink");
  }

  startCarousel(): void {
    this.carousel_ = new Carousel(
      document.querySelector(".services"),
      Array.from(document.querySelectorAll(".content")),
      {
        activeCssClass: "display"
      }
    );
  }

  startCarouselTimer(): void {
    this.carouselTimer_ = new CarouselTimer(this.carousel_);
  }

  startCarouselNav(): void {
    const boxes: HTMLElement = document.querySelector(".boxes");
    const one: HTMLElement = document.querySelector(".box--1");
    const two: HTMLElement = document.querySelector(".box--2");
    const three: HTMLElement = document.querySelector(".box--3");

    const indexToNavItem = new Map([[0, one], [1, two], [2, three]]);

    this.carouselNav_ = new CarouselNav(this.carousel_, boxes, {
      createNavItemFn: (slide, carousel) => {
        const index = carousel.getSlideIndex(slide);
        CarouselNav.addTransitionToSlideListener(
          indexToNavItem.get(index),
          slide,
          carousel
        );
        return indexToNavItem.get(index);
      }
    });
  }

  init(): void {
    console.log("init");
    this.startCarousel();
    this.startCarouselTimer();
    this.startCarouselNav();
  }
}

export { Services };
