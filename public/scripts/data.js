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


function logIn(user) {
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

function logOut() {
    const promise = new Promise((resolve, reject) => {
        const username = localStorage.getItem(LOCAL_STORAGE_USERNAME_KEY);

        localStorage.removeItem(LOCAL_STORAGE_USERNAME_KEY);
        localStorage.removeItem(LOCAL_STORAGE_AUTHKEY_KEY);

        resolve(username);
    });

    return promise;
}

function hasUser() {
    const user = {
        username: localStorage.getItem(LOCAL_STORAGE_USERNAME_KEY),
        authKey: localStorage.getItem(LOCAL_STORAGE_AUTHKEY_KEY)
    };

    if (user.username && user.authKey) {
        return user;
    }
    else{
        return false;
    }
}

function getUserDetails() {
    const headers = {
        'x-auth-key': localStorage.getItem(LOCAL_STORAGE_AUTHKEY_KEY)
    };

    return requester.get('api/users', headers);
}

export const userData = {
    logIn,
    logOut,
    register,
    hasUser,
    getUserDetails
}
