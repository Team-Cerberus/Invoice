import $ from 'jquery';
import { Router } from 'router';
import homeController from 'homeController';
import userController from 'userController';
import aboutController from 'aboutController';

const router = new Router();

router
  .on('/', () => location.hash = '#/home')
  .on('/home', () => homeController.get())
  .on('/user/register', () => userController.register())
  .on('/user/login', () => userController.logIn())
  .on('/user/logout', () => userController.logOut())
  .on('/user/:username', () => userController.profile())
  .on('/about', () => aboutController.get());

$(window).on('hashchange', () => router.navigate());
$(document).ready(() => {
  userController.checkStatus();
  router.navigate();
});