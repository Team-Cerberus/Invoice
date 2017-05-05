import $ from 'jquery';
import { load as loadTemplate } from 'templates';

const $appContainer = $('#app-container');
const $navButtons = $('#nav-buttons').children();
const $homeButton = $('#nav-home');

class HomeController {
  get() {
    Promise.all([
        loadTemplate('home'),
      ])
      .then(([template]) => {
        $appContainer.html(template());
        $navButtons.removeClass();
        $homeButton.addClass('active');
      });
  }
}

export default new HomeController();
