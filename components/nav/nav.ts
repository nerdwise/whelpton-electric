import { ActiveOnCondition } from '../../node_modules/toolbox-v2/src/toolbox/components/active-on-condition/base';
import { Scroll } from '../../node_modules/toolbox-v2/src/toolbox/utils/cached-vectors/scroll';
import { RemoveTransformOnScrollDown } from '../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/effects/remove-transform-on-scroll-down';
import { ScrollEffect } from '../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/base';
import { DistanceFunction } from '../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/distance-function';

class Nav {
  private scrollWatcher_: ActiveOnCondition = null;
  private removeTransformOnScrollDown_: RemoveTransformOnScrollDown = null;
  private scrollEffect_: ScrollEffect = null;
  private mobileNavLinks_: HTMLElement[];
  private navMenu_: HTMLElement;
  private mobileNav_: HTMLElement;

  constructor() {
    this.mobileNavLinks_ = Array.from(
      document.querySelectorAll('.nav__item--mobile')
    );
    this.navMenu_ = document.querySelector('.nav__menu');
    this.mobileNav_ = document.querySelector('.nav--mobile');
  }

  init(): void {
    this.startScrollWatcher();
    this.expandNav();
    this.scrollResponsiveNav();
    this.closeNavOnLinkClick();
  }

  startScrollWatcher(): void {
    this.scrollWatcher_ = new ActiveOnCondition(
      'nav',
      () => {
        return Scroll.getSingleton().getPosition().y > 30;
      },
      'minimal'
    );
  }

  expandNav(): void {
    const navMenu: HTMLElement = document.querySelector('.nav__menu');
    const mobileNav: HTMLElement = document.querySelector('.nav--mobile');

    navMenu.addEventListener('click', () => {
      mobileNav.classList.toggle('display-nav');
      navMenu.classList.toggle('x');
    });
  }

  closeNavOnLinkClick(): void {
    this.mobileNavLinks_.forEach(link => {
      link.addEventListener('click', () => {
        this.mobileNav_.classList.toggle('display-nav');
        this.navMenu_.classList.toggle('x');
      });
    });
  }

  scrollResponsiveNav(): void {
    this.scrollEffect_ = new ScrollEffect(
      <HTMLElement>document.querySelector('.nav'),
      {
        getDistanceFunction: DistanceFunction.DOCUMENT_SCROLL,
        effects: [new RemoveTransformOnScrollDown()],
        condition: () => {
          return window.innerWidth < 1200;
        }
      }
    );
  }

  destroy(): void {
    this.scrollWatcher_.destroy();
    this.scrollWatcher_ = null;
  }
}

export { Nav };
