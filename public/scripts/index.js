import $ from 'jquery';
import 'bootstrap';
import { Router } from 'router';
import homeController from 'homeController';
import userController from 'userController';
import aboutController from 'aboutController';
import invoiceController from 'invoiceController';

const router = new Router();

router
  .on('/', () => location.hash = '#/home')
  .on('/user/register', userController.register)
  .on('/user/login', userController.logIn)
  .on('/user/logout', userController.logOut)
  .on('/user/:username', userController.profile)
  .on('/home', homeController.get)
  .on('/about', aboutController.get)
  .on('/invoice', invoiceController.get)
  .on('/invoice/addrow', invoiceController.addInvoiceRow)
  .on('/invoice/:id', invoiceController.get);

$(window).on('hashchange', () => router.navigate());
$(document).ready(() => {
  userController.checkStatus();
  router.navigate();
});
