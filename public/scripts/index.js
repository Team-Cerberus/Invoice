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
  .on('/user/:username', () => userController.profile())
  .on('/user/login', () => userController.login())
  .on('/user/logout', () => userController.logaut())
  .on('/about', () => aboutController.get());

$(document).ready(router.navigate());
$(window).on('hashchange', () => router.navigate());
