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
  .on('/user/:username/profile', userController.profile)
  .on('/user/:username/companies', userController.companies)
  .on('/user/:username/invoices', userController.invoices)
  .on('/user/:username/invoices/:id', invoiceController.getInvoice)
  .on('/invoice', invoiceController.get)
  .on('/invoice/create/:type', invoiceController.createNewInvoice)
  .on('/invoice/addrow', invoiceController.addInvoiceRow)
  .on('/api/invoice/post', invoiceController.postInvoice)
  .on('/invoice/:id', invoiceController.get);

$(window).on('hashchange', () => router.navigate());
$(document).ready(() => {
  userController.checkStatus();
  router.navigate();
});