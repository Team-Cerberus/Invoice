import $ from 'jquery';
import 'bootstrap';
import { Router } from 'router';
import mainController from 'mainController';
import userController from 'userController';
import invoiceController from 'invoiceController';

const router = new Router();

router
  .on('/', () => location.hash = '#/home')
  .on('/home', mainController.getHomePage)
  .on('/about', mainController.getAboutPage)
  .on('/user/register', userController.register)
  .on('/user/login', userController.logIn)
  .on('/user/logout', userController.logOut)
  .on('/user/:username', userController.profile)
  .on('/user/profile', userController.profile)
  .on('/user/companies', userController.companies)
  .on('/user/invoices', userController.invoices)
  .on('/invoice', invoiceController.get)
  .on('/invoice/addrow', invoiceController.addInvoiceRow)
  .on('/invoice/:id', invoiceController.get);

$(window).on('hashchange', () => router.navigate());
$(document).ready(() => {
  userController.checkStatus();
  router.navigate();
});