import $ from 'jquery';
import { userData } from 'data';
import toastr from 'toastr';
import { load as loadTemplate } from 'templates';

const $appContainer = $('#app-container');
const $secondBar = $('#secondBar');

const USERNAME_PATTERN = /^[A-Za-z0-9_]{5,10}$/,
    PASSWORD_PATTERN = /^[A-Za-z0-9_]{3,10}$/,
    INVALID_USERNAME_MESSAGE = 'Username must be between 5 and 10 characters long and to consist only of latin letters, digits and _!',
    INVALID_PASSWORD_MESSAGE = 'Password must be between 3 and 10 characters long and to consist only of latin letters, digits and _!',
    INVALID_PASSWORD_CONFIRMATION_MESSAGE = 'Confirm password!';

class UserController {
    profile() {
        Promise.all([
            loadTemplate('user-profile'),
            loadTemplate('user-navbar'),
            userData.getUserDetails()

        ])
            .then(([profileTemplate, navbarTemplate, userDetails]) => {
                $appContainer.html(profileTemplate(userDetails.result));
                $secondBar.html(navbarTemplate(userDetails.result));
            });
    }

    companies() {
        Promise.all([
            loadTemplate('user-companies'),
            loadTemplate('user-navbar'),
            userData.getUserDetails()
        ])
            .then(([companiesTemplate, navbarTemplate, userDetails]) => {
                $appContainer.html(companiesTemplate(userDetails.result));
                $secondBar.html(navbarTemplate(userDetails.result));
            });
    }

    invoices() {
        Promise.all([
            loadTemplate('user-invoices'),
            loadTemplate('user-navbar'),
            userData.getUserDetails()
        ])
            .then(([invoicesTemplate, navbarTemplate, userDetails]) => {
                $appContainer.html(invoicesTemplate(userDetails.result));
                $secondBar.html(navbarTemplate(userDetails.result));
            });
    }

    register() {
        loadTemplate('register')
            .then((template) => {
                $appContainer.html(template());

                $('#btn-register').on('click', () => {

                    const $username = $('#tb-reg-username').val(),
                        $password = $('#tb-reg-pass').val(),
                        $passwordConfirm = $('#tb-reg-pass-confirm').val();

                    if (!USERNAME_PATTERN.test($username)) {
                        $('#tb-reg-username').val('');
                        $('#tb-reg-pass').val('');
                        $('#tb-reg-pass-confirm').val('');
                        toastr.error(INVALID_USERNAME_MESSAGE);
                        return;
                    } else if (!PASSWORD_PATTERN.test($password)) {
                        $('#tb-reg-pass').val('');
                        $('#tb-reg-pass-confirm').val('');
                        toastr.error(INVALID_PASSWORD_MESSAGE);
                        return;
                    } else if ($password !== $passwordConfirm) {
                        $('#tb-reg-pass-confirm').val('');
                        toastr.error(INVALID_PASSWORD_CONFIRMATION_MESSAGE);
                        return;
                    }

                    const user = {
                        userName: $('#tb-reg-username').val(),
                        password: $('#tb-reg-pass').val()
                    };

                    userData.register(user)
                        .then((username) => {
                            location.href = '#/home';
                            toastr.success(`${username} was registered successfully!`);
                        }).catch(error => toastr.error(error.responseText));
                });
            });
    }

    logIn() {
        const $username = $('#input-username');
        const $password = $('#input-password');
        const $remember = $('#remember');
        const user = {
            userName: $username.val(),
            password: $password.val()
        };

        $username.val('');
        $password.val('');

        let storageProvider = $remember.is(':checked') ? localStorage : sessionStorage;

        userData.logIn(user, storageProvider)
            .then((username) => {
                $('#user-log-in').addClass('hidden');
                $('#user-log-out').removeClass('hidden');
                $('#user-navbar').removeClass('hidden');
                $('#username').html(username);
                location.href = `#/user/${username}`;
                toastr.success(`Hi, ${username}!`);
            }).catch(error => {
                location.href = `#/home`;
                toastr.error(error.responseText);
            });
    }

    logOut() {
        userData.logOut()
            .then((username) => {
                $('#user-log-out').addClass('hidden');
                $('#user-navbar').addClass('hidden');
                $('#user-log-in').removeClass('hidden');
                location.href = `#/home`;
                toastr.success(`GoodBye, ${username}!`);
            }).catch(errorMsg => toastr.error(errorMsg));
    }

    checkStatus() {
        const user = userData.hasUser(localStorage);

        if (user) {
            $('#username').html(user.username);
            $('#user-log-out').removeClass('hidden');
            $('#user-navbar').removeClass('hidden');
        }
        else {
            $('#user-log-in').removeClass('hidden');
        }
    }
}

export default new UserController();
