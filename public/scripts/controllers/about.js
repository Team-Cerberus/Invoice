import $ from 'jquery';
import { load as loadTemplate } from 'templates';

const $appContainer = $('#app-container');
const $navButtons = $('#nav-buttons').children();
const $aboutButton = $('#nav-about');

class AboutController {
  get() {
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

export default new AboutController();
