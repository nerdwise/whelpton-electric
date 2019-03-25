import { Nav } from "../components/nav/nav";
import { Hero } from "../components/hero/hero";
import { Services } from "../components/services/services";

const nav = new Nav();
nav.startScrollWatcher();
nav.expandNav();

const services = new Services();

if (document.querySelector(".hero")) {
  services.startScrollEffect();
  new Hero(1.1).startScrollEffect();
}
