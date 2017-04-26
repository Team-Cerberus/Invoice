import $ from 'jquery';

class AboutController {

  get(params) {
    $('#app-container').html('<h2>About Section</h2>');
  }
}

export default new AboutController();