import $ from 'jquery';

class HomeController {

  get(params) {
    $('#root').html('SystemJS Works!');
  }
}

export default new HomeController();