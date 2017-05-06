import $ from 'jquery';
import { Router } from 'router';
import homeController from 'homeController';
import userController from 'userController';
import aboutController from 'aboutController';
import invoiceController from 'invoiceController';

const router = new Router();

router
  .on('/', () => location.hash = '#/home')
//  .on('/home', () => homeController.get())
//  .on('/user/register', () => userController.register())
//  .on('/user/login', () => userController.logIn())
//  .on('/user/logout', () => userController.logOut())
//  .on('/user/:username', () => userController.profile())
//  .on('/about', () => aboutController.get());
  .on('/user/register', userController.register)
  .on('/user/login', userController.login)
  .on('/user/logout', userController.logout)
  .on('/user/:username', userController.profile)
  .on('/home', homeController.get)
  .on('/about', aboutController.get)
  .on('/invoice', invoiceController.get)
  .on('/invoice/:id', invoiceController.get);

$(window).on('hashchange', () => router.navigate());
$(document).ready(() => {
  userController.checkStatus();
  router.navigate();
});
