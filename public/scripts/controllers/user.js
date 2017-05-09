import $ from 'jquery';
import { userData } from 'data';
import toastr from 'toastr';
import { load as loadTemplate } from 'templates';

const $appContainer = $('#app-container');
const $secondBar = $('#secondBar');

class UserController {
    profile() {
        Promise.all([
            loadTemplate('user-profile'),
			loadTemplate('user-navbar'),
            userData.getUserDetails()
        ])
            .then(([profileTemplate, navbarTemplate, userDetails]) => {
                $appContainer.html(profileTemplate(userDetails));
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
                $appContainer.html(invoicesTemplate(userDetails));
				$secondBar.html(navbarTemplate(userDetails.result));
            });
    }
	
    register() {
        loadTemplate('register')
            .then((template) => {
                $appContainer.html(template());

                $('#btn-register').on('click', () => {

                    // TODO: Client-side validations for username and password.

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
