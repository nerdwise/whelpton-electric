import { ActiveOnCondition } from '../../node_modules/toolbox-v2/src/toolbox/components/active-on-condition/base';
import { Scroll } from '../../node_modules/toolbox-v2/src/toolbox/utils/cached-vectors/scroll';
import { RemoveTransformOnScrollDown } from '../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/effects/remove-transform-on-scroll-down';
import { ScrollEffect } from '../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/base';
import { DistanceFunction } from '../../node_modules/toolbox-v2/src/toolbox/components/scroll-effect/distance-function';

class Nav {
  private scrollWatcher_: ActiveOnCondition = null;
  private readonly removeTransformOnScrollDown_: RemoveTransformOnScrollDown = null;
  private scrollEffect_: ScrollEffect = null;
  private readonly mobileNavLinks_: HTMLElement[];
  private readonly navMenu_: HTMLElement;
  private readonly mobileNav_: HTMLElement;
  private readonly nav_: HTMLElement;

  constructor() {
    this.mobileNavLinks_ = Array.from(
      document.querySelectorAll('.nav__item--mobile')
    );
    this.navMenu_ = document.querySelector('.nav__menu');
    this.mobileNav_ = document.querySelector('.nav--mobile');
    this.nav_ = document.querySelector('.nav');
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
      this.nav_,
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
