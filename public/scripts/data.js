import CryptoJS from 'cryptojs';
import requester from 'requester';

const LOCAL_STORAGE_USERNAME_KEY = 'signed-in-user-username';
const LOCAL_STORAGE_AUTHKEY_KEY = 'signed-in-user-auth-key';

let storageProvider;

function register(user) {
    const body = {
        userName: user.userName,
        passHash: CryptoJS.SHA1(user.userName + user.password).toString()
    };

    return requester.post('users', body)
        .then((response) => {
            const user = response.result;

            return Promise.resolve(user.userName);
        }).catch(err => {
            return Promise.reject(err);
        });
}

function logIn(user, storage) {

    storageProvider = storage || sessionStorage;

    const body = {
        userName: user.userName,
        passHash: CryptoJS.SHA1(user.userName + user.password).toString()
    };

    return requester.put('users/auth', body)
        .then((response) => {
            const user = response.result;

            storageProvider.setItem(LOCAL_STORAGE_USERNAME_KEY, user.userName);
            storageProvider.setItem(LOCAL_STORAGE_AUTHKEY_KEY, user.authKey);

            return Promise.resolve(user.userName)
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
        userName: storageProvider.getItem(LOCAL_STORAGE_USERNAME_KEY),
        authKey: storageProvider.getItem(LOCAL_STORAGE_AUTHKEY_KEY)
    };

    if (user.userName && user.authKey) {
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

    return requester.get('users', headers);
}

function getInvoiceDetails() {
    const headers = {
        'x-auth-key': storageProvider.getItem(LOCAL_STORAGE_AUTHKEY_KEY)
    };

    return requester.get('users', headers);
}

function getSellers() {
    const body = {
        headers: {
            'x-auth-key': storageProvider.getItem(LOCAL_STORAGE_AUTHKEY_KEY)
        }
    }
    return requester.get('/sellers', options)
        .then(function (res) {
            return res.result;
        });
}

function sellerAdd(seller) {
    const username = storageProvider.getItem(LOCAL_STORAGE_USERNAME_KEY);

    const options = {
        user: username,
        data: seller,
        headers: {
            'x-auth-key': localStorage.getItem(LOCAL_STORAGE_AUTHKEY_KEY)
        }
    };
    return requester.post('/sellers', options)
        .then(function (resp) {
            return resp.result;
        });
}

function sellerUpdate(seller) {
    const username = storageProvider.getItem(LOCAL_STORAGE_USERNAME_KEY);

    const options = {
        data: seller,
        user: username,
        headers: {
            'x-auth-key': localStorage.getItem(LOCAL_STORAGE_AUTHKEY_KEY)
        }
    };
    return requester.put('/sellers', options)
        .then(function (resp) {
            return resp.result;
        });

}

function getBuyers() {
    const body = {
        headers: {
            'x-auth-key': storageProvider.getItem(LOCAL_STORAGE_AUTHKEY_KEY)
        }
    }
    return requester.get('/buyers', options)
        .then(function (res) {
            return res.result;
        });
}

function buyerAdd(buyer) {
    const options = {
        data: buyer,
        headers: {
            'x-auth-key': localStorage.getItem(LOCAL_STORAGE_AUTHKEY_KEY)
        }
    };
    return requester.post('/buyers', options)
        .then(function (resp) {
            return resp.result;
        });
}

function buyerUpdate(buyer) {
    const options = {
        data: buyer,
        headers: {
            'x-auth-key': localStorage.getItem(LOCAL_STORAGE_AUTHKEY_KEY)
        }
    };
    return requester.put('/buyers', options)
        .then(function (resp) {
            return resp.result;
        });
}

function getInvoices() {            //TODO: For a single invoice and for the last invoice number
    const body = {
        headers: {
            'x-auth-key': storageProvider.getItem(LOCAL_STORAGE_AUTHKEY_KEY)
        }
    }
    return requester.get('api/invoice', options)
        .then(function (res) {
            return res.result;
        });
}

function invoiceAdd(invoice) {
    const username = storageProvider.getItem(LOCAL_STORAGE_USERNAME_KEY);

    const options = {
        user: username,
        sellerIDNumber: invoice._sellerIdNumber,
        data: invoice,
        headers: {
            'x-auth-key': localStorage.getItem(LOCAL_STORAGE_AUTHKEY_KEY)
        }
    };
    
    return requester.post('api/invoice', options)
        .then(function (resp) {
            return resp.result;
        });
}

function invoiceUpdate(invoice) {
    const options = {
        data: invoice,
        headers: {
            'x-auth-key': localStorage.getItem(LOCAL_STORAGE_AUTHKEY_KEY)
        }
    };
    return requester.put('api/invoice', options)
        .then(function (resp) {
            return resp.result;
        });
}

export const userData = {
    logIn,
    logOut,
    register,
    hasUser,
    getUserDetails,
    getSellers,
    sellerAdd,
    sellerUpdate,
    getBuyers,
    buyerAdd,
    buyerUpdate,
    getInvoices,
    invoiceAdd,
    invoiceUpdate,
}
