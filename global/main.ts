import { Nav } from '../components/nav/nav';
import { Hero } from '../components/hero/hero';
import { Services } from '../components/services/services';
import { Projects } from '../components/projects/projects';
import { onDomContentLoad } from '../node_modules/toolbox-v2/src/toolbox/utils/dom/on-dom-content-load';

const projects = new Projects();
const nav = new Nav();
const services = new Services();

// No need to use the returned promise
const _unused = onDomContentLoad(() => {
  projects.init();
  nav.init();
  services.init();

  if (document.querySelector('.hero')) {
    new Hero(1.1).init();
  }
});
