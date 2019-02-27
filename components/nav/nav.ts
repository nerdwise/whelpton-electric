const nav = <HTMLElement>document.querySelector(".nav");
const navLogo = <HTMLElement>document.querySelector(".nav__logo");
const navContent = <HTMLElement>document.querySelector(".nav__content");

// Shrink navbar when the user scrolls
const shrinkScroll = () => {
  window.onscroll = () => {
    if (window.pageYOffset > 30) {
      nav.style.height = "5vh";
      navLogo.style.height = "0";
      navContent.style.height = "100%";
    } else {
      nav.style.height = "15vh";
      navLogo.style.height = "7.5vh";
      navContent.style.height = "50%";
    }
  };
};

export default shrinkScroll;
