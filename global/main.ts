import { Nav } from '../components/nav/nav';
import { Hero } from '../components/hero/hero';
import { Services } from '../components/services/services';
import { Projects } from '../components/projects/projects';

const projects = new Projects();
projects.init();

const nav = new Nav();
nav.init();

const services = new Services();
services.init();

if (document.querySelector('.hero')) {
  new Hero(1.1).startScrollEffect();
}
