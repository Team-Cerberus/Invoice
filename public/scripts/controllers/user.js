import $ from 'jquery';
import { userData } from 'data';
import toastr from 'toastr';
import { load as loadTemplate } from 'templates';

const $appContainer = $('#app-container');

class UserController {
    profile() {
		// TODO: Remove Temporary Details
		let userDetails =  {
			userName: "My Awesome User",
			sellers: [
			{
				name: "My Awesome Seller 1",
				streetAddress: "Sofia, Invisible str. 11",
				city: "Sofia",
				zIP: "1000",
				idNumber: "12345",
				vATNumber: "900000000",
				authorizedPerson: "My Awesome MOL",
				recepients: [],
				issuers: [],
				bankAccounts: [],
				invoices: []
			},
			{
				name: "My Other Seller",
				streetAddress: "Plovdiv, Asenovgradsko shose 1",
				city: "Plovdiv",
				zIP: "1234",
				idNumber: "22222",
				vATNumber: "223423414",
				authorizedPerson: "My Other MOL",
				recepients: [],
				issuers: [],
				bankAccounts: [],
				invoices: []
			}
			],
			buyers: [
			{
				name: "My Awesome Buyer 1",
				streetAddress: "Vladislav Varnenchik blvd. 5",
				city: "Sofia",
				zIP: "1234",
				idNumber: "22222",
				vATNumber: "1234567489",
				authorizedPerson: "Their Awesome MOL",
				bankAccounts: [],
			}],
		}
		
		// let userDetails = userData.getUserDetails();
        Promise.all([
            loadTemplate('user-profile'),
            userDetails
        ])
            .then(([template, userDetails]) => {
                $appContainer.html(template(userDetails));
            });
    }

    invoices() {
		// TODO: Remove Temporary Details
		let userInvoices =  {
			userName: "My Awesome User",
			sellers: [],
			buyers: [],
		}
		
		// let userInvoices = userData.getUserInvoices();
        Promise.all([
            loadTemplate('user-invoices'),
            userInvoices
        ])
            .then(([template, userInvoices]) => {
                $appContainer.html(template(userInvoices));
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
            username: $username.val(),
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
