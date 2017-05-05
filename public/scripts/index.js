import $ from 'jquery';
import { Router } from 'router';
import homeController from 'homeController';
import aboutController from 'aboutController';
import invoiceController from 'invoiceController';

const router = new Router();

router
  .on('/', () => location.hash = '#/home')
  .on('/home', homeController.get)
  .on('/about', aboutController.get)
  .on('/invoice', invoiceController.get)
  .on('/invoice/:id', invoiceController.get);

$(document).ready(router.navigate());
$(window).on('hashchange', () => router.navigate());
