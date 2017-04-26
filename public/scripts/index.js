import $ from 'jquery';
import { Router } from 'router';
import homeController from 'homeController';
import aboutController from 'aboutController';

const router = new Router();

router
  .on('/', () => location.hash = '#/home')
  .on('/home', () => homeController.get())
  .on('/about', () => aboutController.get());

$(document).ready(router.navigate());
$(window).on('hashchange', () => router.navigate());
