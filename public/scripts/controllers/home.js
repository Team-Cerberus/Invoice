import $ from 'jquery';

class HomeController {

  get(params) {
    $('#app-container').html('<h2>Home Section</h2>');
  }
}

export default new HomeController();