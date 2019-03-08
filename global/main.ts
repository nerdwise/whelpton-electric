import { Nav } from "../components/nav/nav";
import { Hero } from "../components/hero/hero";

const nav = new Nav();
nav.startScrollWatcher();
nav.expandNav();

new Hero(1.1).startScrollEffect();
