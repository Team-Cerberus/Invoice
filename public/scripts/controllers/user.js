import $ from 'jquery';
import { userData } from 'data';
import toastr from 'toastr';
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

                    // TODO: Client-side validations for username and password.

                    const user = {
                        username: $('#tb-reg-username').val(),
                        password: $('#tb-reg-pass').val()
                    };

                    userData.register(user)
                        .then((username) => {
                            location.href = '#/home';
                            toastr.success(`Hi, ${username}!`);
                        });

                      // TODO: Add popup for success and error  

                });
            });
    }

    login() {

    }
}

export default new UserController();
