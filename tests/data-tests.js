const chai = require('chai'),
    sinon = require('sinon'),
    sinonChai = require('sinon-chai'),
    mockRequire = require('mock-require');

mockRequire('cryptojs', {
    SHA1: () => {
        return 'HASHED_PASSWORD';
    }
});
mockRequire('requester', {
    post: () => Promise.resolve({
        result: {
            userName: 'username',
            passHash: 'HASHED_PASSWORD'
        }
    }),
    put: () => Promise.resolve({
        result: {
            userName: 'username',
            authKey: 'AUTHENTICATION_KEY'
        }
    })
});

const { userData } = require('../public/scripts/data'),
    requester = require('requester'),
    CryptoJS = require('cryptojs'),
    { expect } = chai;

chai.use(sinonChai);

describe('Data layer tests', () => {
    const LOCAL_STORAGE_USERNAME_KEY = 'signed-in-user-username',
        LOCAL_STORAGE_AUTHKEY_KEY = 'signed-in-user-auth-key';

    describe('User tests', () => {

        describe('Register tests', () => {
            const user = {
                userName: 'username',
                password: 'password'
            };

            let requesterPostSpy,
                cryptoJSSpy;

            beforeEach(() => {
                requesterPostSpy = sinon.spy(requester, 'post');
                cryptoJSSpy = sinon.spy(CryptoJS, 'SHA1');
            });

            afterEach(() => {
                requesterPostSpy.restore();
                cryptoJSSpy.restore();
            });

            it('expect register to make a POST request', (done) => {

                userData.register(user)
                    .then(expect(requesterPostSpy).to.have.been.calledOnce)
                    .then(() => done())
                    .catch(done);
            });

            it('expect register to make a POST request to api/users', (done) => {

                userData.register(user)
                    .then(expect(requesterPostSpy).to.have.been.calledWith('users'))
                    .then(() => done())
                    .catch(done);
            });

            it('expect register to make a POST request with user username', (done) => {

                userData.register(user)
                    .then(() => {
                        const expected = {
                            userName: user.userName
                        };
                        expect(requesterPostSpy.args[0][1].userName).to.equal(user.userName);
                    })
                    .then(() => done())
                    .catch(done);
            });

            it('expect register to make a call to CryptoJS.SHA1() once', (done) => {

                userData.register(user)
                    .then(expect(cryptoJSSpy).to.have.been.calledOnce)
                    .then(() => done())
                    .catch(done);
            });

            it('expect register to make a call to CryptoJS.SHA1() with correct params', (done) => {

                userData.register(user)
                    .then(expect(cryptoJSSpy).to.have.been.calledWith(user.userName + user.password))
                    .then(() => done())
                    .catch(done);
            });

            it('expect register to make a POST request with user passHash', (done) => {

                userData.register(user)
                    .then(() => {
                        const expected = {
                            data: {
                                username: user.username
                            }
                        };
                        expect(requesterPostSpy.args[0][1].passHash).to.equal('HASHED_PASSWORD');
                    })
                    .then(() => done())
                    .catch(done);
            });

            it('expect register function to return a Promise', () => {

                const promise = userData.register(user);
                expect(promise).to.be.an.instanceof(Promise);
            });

            it('expect register function to return a Promise which resolves with registered username', (done) => {

                userData.register(user)
                    .then((value) => expect(value).to.deep.equal(user.userName))
                    .then(() => done())
                    .catch(done);
            });
        });

        describe('LogIn tests', () => {
            const user = {
                userName: 'username',
                password: 'password'
            };

            let requesterPutSpy,
                cryptoJSSpy;

            beforeEach(() => {
                requesterPutSpy = sinon.spy(requester, 'put');
                cryptoJSSpy = sinon.spy(CryptoJS, 'SHA1');
                localStorage.clear();
                sessionStorage.clear();
            });

            afterEach(() => {
                requesterPutSpy.restore();
                cryptoJSSpy.restore();
                localStorage.clear();
                sessionStorage.clear();
                localStorage.itemInsertionCallback = null;
                sessionStorage.itemInsertionCallback = null;
            });

            it('expect login to make a PUT request', (done) => {

                userData.logIn(user, localStorage)
                    .then(expect(requesterPutSpy).to.have.been.calledOnce)
                    .then(() => done())
                    .catch(done);
            });

            it('expect login to make a PUT request to api/users/auth', (done) => {

                userData.logIn(user, localStorage)
                    .then(expect(requesterPutSpy).to.have.been.calledWith('users/auth'))
                    .then(() => done())
                    .catch(done);
            });

            it('expect login to make a PUT request with user username', (done) => {

                userData.logIn(user, localStorage)
                    .then(() => {
                        const expected = {
                            userName: user.userName
                        };
                        expect(requesterPutSpy.args[0][1].userName).to.equal(user.userName);
                    })
                    .then(() => done())
                    .catch(done);
            });

            it('expect login to make a call to CryptoJS.SHA1() once', (done) => {

                userData.logIn(user, localStorage)
                    .then(expect(cryptoJSSpy).to.have.been.calledOnce)
                    .then(() => done())
                    .catch(done);
            });

            it('expect login to make a call to CryptoJS.SHA1() with correct params', (done) => {

                userData.logIn(user, localStorage)
                    .then(expect(cryptoJSSpy).to.have.been.calledWith(user.userName + user.password))
                    .then(() => done())
                    .catch(done);
            });

            it('expect login to make a POST request with user passHash', (done) => {

                userData.logIn(user, localStorage)
                    .then(() => {
                        const expected = {
                            username: user.username
                        };
                        expect(requesterPutSpy.args[0][1].passHash).to.equal('HASHED_PASSWORD');
                    })
                    .then(() => done())
                    .catch(done);
            });

            it('expect username to be set in session storage, when session storage is passed', (done) => {

                expect(sessionStorage.getItem(LOCAL_STORAGE_USERNAME_KEY)).to.be.null;

                userData.logIn(user, sessionStorage)
                    .then(() => expect(sessionStorage.getItem(LOCAL_STORAGE_USERNAME_KEY)).to.equal(user.userName))
                    .then(() => done())
                    .catch(done);
            });

            it('expect username to be set in session storage, when no storage provider is passed', (done) => {

                expect(sessionStorage.getItem(LOCAL_STORAGE_USERNAME_KEY)).to.be.null;

                userData.logIn(user)
                    .then(() => expect(sessionStorage.getItem(LOCAL_STORAGE_USERNAME_KEY)).to.equal(user.userName))
                    .then(() => done())
                    .catch(done);
            });

            it('expect username to be set in local storage, when local storage is passed', (done) => {

                expect(localStorage.getItem(LOCAL_STORAGE_USERNAME_KEY)).to.be.null;

                userData.logIn(user, localStorage)
                    .then(() => expect(localStorage.getItem(LOCAL_STORAGE_USERNAME_KEY)).to.equal(user.userName))
                    .then(() => done())
                    .catch(done);
            });

            it('expect authKey to be set in session storage, when session storage is passed', (done) => {

                expect(sessionStorage.getItem(LOCAL_STORAGE_AUTHKEY_KEY)).to.be.null;

                userData.logIn(user, sessionStorage)
                    .then(() => expect(sessionStorage.getItem(LOCAL_STORAGE_AUTHKEY_KEY)).to.equal('AUTHENTICATION_KEY'))
                    .then(() => done())
                    .catch(done);
            });

            it('expect authKey to be set in session storage, when no storage provider is passed', (done) => {

                expect(sessionStorage.getItem(LOCAL_STORAGE_AUTHKEY_KEY)).to.be.null;

                userData.logIn(user)
                    .then(() => expect(sessionStorage.getItem(LOCAL_STORAGE_AUTHKEY_KEY)).to.equal('AUTHENTICATION_KEY'))
                    .then(() => done())
                    .catch(done);
            });


            it('expect authKey to be set in local storage, when local storage is passed', (done) => {

                expect(localStorage.getItem(LOCAL_STORAGE_AUTHKEY_KEY)).to.be.null;

                userData.logIn(user, localStorage)
                    .then(() => expect(localStorage.getItem(LOCAL_STORAGE_AUTHKEY_KEY)).to.equal('AUTHENTICATION_KEY'))
                    .then(() => done())
                    .catch(done);
            });

            it('expect login function to return a Promise', () => {

                const promise = userData.logIn(user, localStorage);
                expect(promise).to.be.an.instanceof(Promise);
            });

            it('expect login function to return a Promise which resolves with registered username', (done) => {

                userData.logIn(user, localStorage)
                    .then((value) => expect(value).to.deep.equal(user.userName))
                    .then(() => done())
                    .catch(done);
            });
        });

        describe('LogOut tests', () => {

            const user = {
                username: 'username',
                password: 'password'
            };

            beforeEach(() => {
                localStorage.clear();
                sessionStorage.clear();
            });

            afterEach(() => {
                localStorage.clear();
                sessionStorage.clear();
                localStorage.itemInsertionCallback = null;
                sessionStorage.itemInsertionCallback = null;
            });

            it('expect username to be cleared from session storage.', (done) => {

                userData.logIn(user, sessionStorage)
                    .then(() => expect(sessionStorage.getItem(LOCAL_STORAGE_USERNAME_KEY)).to.be.equal('username'))
                    .then(() => userData.logOut())
                    .then(() => expect(sessionStorage.getItem(LOCAL_STORAGE_USERNAME_KEY)).to.be.null)
                    .then(() => done())
                    .catch(() => done());

            });

            it('expect username to be cleared from local storage.', (done) => {

                userData.logIn(user, localStorage)
                    .then(() => expect(localStorage.getItem(LOCAL_STORAGE_USERNAME_KEY)).to.be.equal('username'))
                    .then(() => userData.logOut())
                    .then(() => expect(localStorage.getItem(LOCAL_STORAGE_USERNAME_KEY)).to.be.null)
                    .then(() => done())
                    .catch(() => done());

            });

            it('expect authKey to be cleared from session storage.', (done) => {

                userData.logIn(user, sessionStorage)
                    .then(() => expect(sessionStorage.getItem(LOCAL_STORAGE_AUTHKEY_KEY)).to.be.equal('AUTHENTICATION_KEY'))
                    .then(() => userData.logOut())
                    .then(() => expect(sessionStorage.getItem(LOCAL_STORAGE_AUTHKEY_KEY)).to.be.null)
                    .then(() => done())
                    .catch(() => done());

            });

            it('expect authKey to be cleared from local storage.', (done) => {

                userData.logIn(user, localStorage)
                    .then(() => expect(localStorage.getItem(LOCAL_STORAGE_AUTHKEY_KEY)).to.be.equal('AUTHENTICATION_KEY'))
                    .then(() => userData.logOut())
                    .then(() => expect(localStorage.getItem(LOCAL_STORAGE_AUTHKEY_KEY)).to.be.null)
                    .then(() => done())
                    .catch(() => done());

            });

            it('expect signOut function to return a Promise.', () => {
                const promise = userData.logOut();
                expect(promise).to.be.an.instanceof(Promise);
            });

            it('expect signOut function to return a Promise resolving with username.', (done) => {
                localStorage.setItem(LOCAL_STORAGE_USERNAME_KEY, 'username');
                expect(localStorage.getItem(LOCAL_STORAGE_USERNAME_KEY)).to.be.equal('username');

                userData.logOut()
                    .then((username) => expect(username).to.be.equal('username'))
                    .then(() => done())
                    .catch(done);
            });
        });

        describe('hasUser tests', () => {

            const user = {
                userName: 'username',
                password: 'password'
            };

            beforeEach(() => {
                localStorage.clear();
                sessionStorage.clear();
            });

            afterEach(() => {
                localStorage.clear();
                sessionStorage.clear();
                localStorage.itemInsertionCallback = null;
                sessionStorage.itemInsertionCallback = null;
            });

            it('expect hasUser() to return false when there in no username or authKey in local storage', () => {
                expect(userData.hasUser()).to.be.false;
            });

            it('expect hasUser() to return false when authKey is missing from local storage', (done) => {

                userData.logIn(user, localStorage)
                    .then(() => {
                        localStorage.removeItem(LOCAL_STORAGE_AUTHKEY_KEY);
                        expect(userData.hasUser()).to.be.false;
                    })
                    .then(() => done())
                    .catch(done);

            });

            it('expect hasUser() to return false when username is missing from local storage', (done) => {

                userData.logIn(user, localStorage)
                    .then(() => {
                        localStorage.removeItem(LOCAL_STORAGE_USERNAME_KEY);
                        expect(userData.hasUser()).to.be.false;
                    })
                    .then(() => done())
                    .catch(done);

            });

            it('expect hasUser() to return user when both username and authKey are available in local storage', (done) => {

                userData.logIn(user, localStorage)
                    .then(() => {
                        const expectedUser = {
                            userName: user.userName,
                            authKey: 'AUTHENTICATION_KEY'
                        }

                        expect(userData.hasUser()).to.be.deep.equal(expectedUser);
                    })
                    .then(() => done())
                    .catch(done);

            });

            it('expect hasUser() to return false when user is loged in session storage', (done) => {

                userData.logIn(user, sessionStorage)
                    .then(() => expect(userData.hasUser()).to.be.false)
                    .then(() => done())
                    .catch(done);

            });
        });
    });
});
