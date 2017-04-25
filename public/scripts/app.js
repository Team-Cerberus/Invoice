import $ from 'jquery';
import { Router } from 'router';
import homeController from 'homeController';

const router = new Router();

router
  .on('/', () => location.hash = '#/home')
  .on('/home', () => homeController.get());

$(document).ready(router.navigate());
$(window).on('hashchange', () => router.navigate());