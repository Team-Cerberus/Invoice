import $ from 'jquery';
import { userData } from 'data';
import { load as loadTemplate } from 'templates';

const $appContainer = $('#app-container');

class UserController {
    profile() {
        Promise.all([
            loadTemplate('user'),
            userData.profile()
        ])
            .then(([template, userDetails]) => {
                $appContainer.html(template(userDetails));
                // TODO: Hide login and register buttons
            });
    }

    register() {
        loadTemplate('register')
            .then((template) => {
                $appContainer.html(template());

                $('#btn-register').on('click', () => {
                    const user = {
                        username: $('#tb-reg-username').val(),
                        password: $('#tb-reg-pass').val()
                    };

                    userData.register(user)
                        .then(() => {
                            location.href = '#/home';
                        });

                      // TODO: Add popup for succes and error  
                      
                });
            });
    }

    login() {

    }
}

export default new UserController();
