import { Nav } from "../components/nav/nav";
import { Hero } from "../components/hero/hero";
import { Services } from "../components/services/services";
import { Projects } from "../components/projects/projects";

const nav = new Nav();
nav.startScrollWatcher();
nav.expandNav();
nav.scrollResponsiveNav();

const services = new Services();
const projects = new Projects();
projects.init();

if (document.querySelector(".hero")) {
  services.startScrollEffect();
  new Hero(1.1).startScrollEffect();
}
