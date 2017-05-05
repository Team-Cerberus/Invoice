import CryptoJS from 'cryptojs';
import requester from 'requester';

const LOCAL_STORAGE_USERNAME_KEY = 'signed-in-user-username';
const LOCAL_STORAGE_AUTHKEY_KEY = 'signed-in-user-auth-key';

function register(user) {
    const body = {
        username: user.username,
        passHash: CryptoJS.SHA1(user.username + user.password).toString()
    };

    return requester.post('api/users', body)
        .then((response) => {
            const user = response.result;

            return Promise.resolve(user.username)
        });
}


function login(user) {
    const body = {
        username: user.username,
        passHash: CryptoJS.SHA1(user.username + user.password).toString()
    };

    return requester.put('api/users/auth', body)
        .then((response) => {
            const user = response.result;

            localStorage.setItem(LOCAL_STORAGE_USERNAME_KEY, user.username);
            localStorage.setItem(LOCAL_STORAGE_AUTHKEY_KEY, user.authKey);

            return Promise.resolve(user.username)
        });
}

function logout() {
    const promise = new Promise((resolve, reject) => {
        localStorage.removeItem(LOCAL_STORAGE_USERNAME_KEY);
        localStorage.removeItem(LOCAL_STORAGE_AUTHKEY_KEY);
        resolve();
    });

    return promise;
}

function hasUser() {
    return (!!localStorage.getItem(LOCAL_STORAGE_USERNAME_KEY) &&
        !!localStorage.getItem(LOCAL_STORAGE_AUTHKEY_KEY));
}

function getUserDetails() {
    //TODO: Implement logic
}

export default {
    userData: {
        login,
        logout,
        register,
        hasUser,
        getUserDetails
    }
};