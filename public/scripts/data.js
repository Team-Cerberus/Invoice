import CryptoJS from 'cryptojs';
import requester from 'requester';

const LOCAL_STORAGE_USERNAME_KEY = 'signed-in-user-username';
const LOCAL_STORAGE_AUTHKEY_KEY = 'signed-in-user-auth-key';

let storageProvider;

function register(user) {
    const body = {
        username: user.username,
        passHash: CryptoJS.SHA1(user.username + user.password).toString()
    };

    return requester.post('api/users', body)
        .then((response) => {
            const user = response.result;

            return Promise.resolve(user.username);
        }).catch(err => {
            return Promise.reject(err);
        });
}


function logIn(user, storage) {

    storageProvider = storage || sessionStorage;

    const body = {
        username: user.username,
        passHash: CryptoJS.SHA1(user.username + user.password).toString()
    };

    return requester.put('api/users/auth', body)
        .then((response) => {
            const user = response.result;

            storageProvider.setItem(LOCAL_STORAGE_USERNAME_KEY, user.username);
            storageProvider.setItem(LOCAL_STORAGE_AUTHKEY_KEY, user.authKey);

            return Promise.resolve(user.username)
        }).catch(err => {
            return Promise.reject(err);
        });
}

function logOut() {
    storageProvider = storageProvider || localStorage;

    const promise = new Promise((resolve, reject) => {
        const username = storageProvider.getItem(LOCAL_STORAGE_USERNAME_KEY);

        storageProvider.removeItem(LOCAL_STORAGE_USERNAME_KEY);
        storageProvider.removeItem(LOCAL_STORAGE_AUTHKEY_KEY);

        resolve(username);
    });

    return promise;
}

function hasUser(storage) {
    storageProvider = storage || localStorage;

    const user = {
        username: storageProvider.getItem(LOCAL_STORAGE_USERNAME_KEY),
        authKey: storageProvider.getItem(LOCAL_STORAGE_AUTHKEY_KEY)
    };

    if (user.username && user.authKey) {
        return user;
    }
    else {
        return false;
    }
}

function getUserDetails() {
    const headers = {
        'x-auth-key': storageProvider.getItem(LOCAL_STORAGE_AUTHKEY_KEY)
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
