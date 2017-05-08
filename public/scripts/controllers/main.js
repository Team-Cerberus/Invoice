import $ from 'jquery';
import { load as loadTemplate } from 'templates';

const $appContainer = $('#app-container');
const $navButtons = $('#nav-buttons').children();
const $homeButton = $('#nav-home');
const $aboutButton = $('#nav-about');

class MainController {
  getHomePage() {
    Promise.all([
        loadTemplate('home'),
      ])
      .then(([template]) => {
        $appContainer.html(template());
        $navButtons.removeClass();
        $homeButton.addClass('active');
      });
  }
  
    getAboutPage() {
    Promise.all([
        loadTemplate('about'),
      ])
      .then(([template]) => {
        $appContainer.html(template());
        $navButtons.removeClass();
        $aboutButton.addClass('active');
      });
  }
}

export default new MainController();