import { ScrollEffect } from '../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/base';
import { Tween } from '../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/effects/tween/tween';
import { DistanceFunction } from '../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/distance-function';
import { Carousel } from '../../node_modules/toolbox-v2/src/toolbox/components/carousel/carousel';
import { CarouselNav } from '../../node_modules/toolbox-v2/src/toolbox/components/carousel/nav';
import { CarouselTimer } from '../../node_modules/toolbox-v2/src/toolbox/components/carousel/timer';

class Services {
  private carousel_: Carousel = null;
  private readonly carouselTimer_: CarouselTimer = null;
  private carouselNav_: CarouselNav = null;
  private inviewScrollEffect_: ScrollEffect = null;
  private boxes_: NodeListOf<Element>;
  private boxContainer_: HTMLElement;
  private services_: HTMLElement;
  private content_: HTMLElement[];

  constructor() {
    this.boxes_ = document.querySelectorAll('.box');
    this.boxContainer_ = document.querySelector('.boxes');
    this.services_ = document.querySelector('.services');
    this.content_ = Array.from(document.querySelectorAll('.content'));

    this.boxes_.forEach(box => {
      const oneTimeInit = () => {
        this.initOnce_(box);
        this.shrink_();
        box.removeEventListener('click', oneTimeInit);
      };
      box.addEventListener('click', oneTimeInit);
    });
  }

  public init(): void {
    this.inviewTriggerEffect_(document.querySelector('.services__header'));
    this.inviewTriggerEffect_(document.querySelector('.boxes'));
  }

  private initOnce_(box: Element): void {
    this.startCarousel_(box);
    this.startCarouselNav_();
  }

  private shrink_(): void {
    this.boxContainer_.classList.add('shrink');
  }

  private startCarousel_(box: Element): void {
    this.carousel_ = new Carousel(
      this.services_,
      this.content_,
      {
        activeCssClass: 'display'
      }
    );
    const classNum: string = box.className[box.className.length - 1];
    const index: number = parseInt(classNum) - 1;
    this.carousel_.transitionToIndex(index);
  }

  private startCarouselNav_(): void {
    const boxes: HTMLElement[] = 
      Array.from(this.boxContainer_.querySelectorAll('.box'));
    const indexToNavItem = new Map();
    boxes.forEach((box, boxIndex) => {
      indexToNavItem.set(boxIndex, box);
    });

    this.carouselNav_ = new CarouselNav(this.carousel_, this.boxContainer_, {
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

  private inviewTriggerEffect_(target: HTMLElement): void {
    this.inviewScrollEffect_ = new ScrollEffect(target, {
      effects: [
        new Tween([
          [0, 'opacity: 0; transform: translateY(50%)'],
          [1, 'opacity: 1; transform: translateY(0)']
        ])
      ],
      getDistanceFunction: DistanceFunction.DOCUMENT_SCROLL,
      startDistance: 0,
      endDistance: () => {
        return window.innerHeight / 2;
      }
    });
  }
}

export { Services };
