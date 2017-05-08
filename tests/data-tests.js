const chai = require('chai'),
    sinon = require('sinon'),
    sinonChai = require('sinon-chai'),
    mockRequire = require('mock-require');

mockRequire('cryptojs');
mockRequire('requester');
mockRequire('data', { userData: require('../public/scripts/data').userData });

const { userData } = require('data'),
    { expect } = chai;

chai.use(sinonChai);

describe('Data layer tests', () => {
    const LOCAL_STORAGE_USERNAME_KEY = 'signed-in-user-username',
        LOCAL_STORAGE_AUTHKEY_KEY = 'signed-in-user-auth-key';

    describe('User tests', () => {
    
        describe('Logout tests', () => {

            beforeEach(() => {
                localStorage.clear();
            });
            afterEach(() => {
                localStorage.clear();
                localStorage.itemInsertionCallback = null;
            });

            it('expect username to be cleared from localStorage.', (done) => {

                localStorage.setItem(LOCAL_STORAGE_USERNAME_KEY, 'username');
                expect(localStorage.getItem(LOCAL_STORAGE_USERNAME_KEY)).to.be.equal('username');

                userData.logOut()
                    .then(expect(localStorage.getItem(LOCAL_STORAGE_USERNAME_KEY)).to.be.null)
                    .then(() => done())
                    .catch(() => done());

            });

            it('expect authKey to be cleared from localStorage.', (done) => {
                localStorage.setItem(LOCAL_STORAGE_AUTHKEY_KEY, 'authentication key');
                expect(localStorage.getItem(LOCAL_STORAGE_AUTHKEY_KEY)).to.be.equal('authentication key');

                userData.logOut()
                    .then(expect(localStorage.getItem(LOCAL_STORAGE_AUTHKEY_KEY)).to.be.null)
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
                    .catch(() => done());
            });
        });
    });
});