const chai = require('chai'),
    sinon = require('sinon'),
    sinonChai = require('sinon-chai'),
    mockRequire = require('mock-require');

mockRequire('jquery', {
    ajax: (args) => {
        args['success']('proper response');
    }
});

chai.use(sinonChai);

const $ = require('jquery'),
    requester = require('../public/scripts/requester'),
    { expect } = chai;

describe('Requester tests', () => {

    describe('Get tests', () => {
        let ajaxSpy;

        beforeEach(() => {
            ajaxSpy = sinon.spy($, 'ajax');
        });

        afterEach(() => {
            ajaxSpy.restore();
        });

        it('expect get function to make a ajax request', (done) => {

            requester.get()
                .then(() => expect(ajaxSpy).to.have.been.calledOnce)
                .then(() => done())
                .catch(done);
        });

        it('expect get function to make a ajax request with type GET', (done) => {

            requester.get()
                .then(() => expect(ajaxSpy.getCall(0).args[0].type).to.equal('GET'))
                .then(() => done())
                .catch(done);
        });

        it('expect get function to make a ajax request with proper url', (done) => {

            const properUrl = 'some/kind/of/proper/url';

            requester.get(properUrl)
                .then(() => expect(ajaxSpy.getCall(0).args[0].url).to.equal(properUrl))
                .then(() => done())
                .catch(done);
        });

        it('expect get function to make a ajax request with empty object as headers, when no headers passed', (done) => {

            requester.get()
                .then(() => expect(ajaxSpy.getCall(0).args[0].headers).to.deep.equal({}))
                .then(() => done())
                .catch(done);
        });

        it('expect get function to make a ajax request with proper headers, when headers passed', (done) => {

            const properUrl = 'some/kind/of/proper/url',
                headers = {
                    'x-auth-key': 'AUTHENTICATION_KEY'
                };

            requester.get(properUrl, headers)
                .then(() => expect(ajaxSpy.getCall(0).args[0].headers).to.equal(headers))
                .then(() => done())
                .catch(done);
        });

        it('expect get function to return a Promise', () => {

            const promise = requester.get();
            expect(promise).to.be.an.instanceof(Promise);
        });

        it('expect get function to return a Promise which resolves with with proper response', (done) => {

            requester.get()
                .then((value) => expect(value).to.equal('proper response'))
                .then(() => done())
                .catch(done);
        });
    });

    describe('Post tests', () => {
        let ajaxSpy;

        beforeEach(() => {
            ajaxSpy = sinon.spy($, 'ajax');
        });

        afterEach(() => {
            ajaxSpy.restore();
        });

        it('expect post function to make a ajax request', (done) => {

            requester.post()
                .then(() => expect(ajaxSpy).to.have.been.calledOnce)
                .then(() => done())
                .catch(done);
        });

        it('expect post function to make a ajax request with type POST', (done) => {

            requester.post()
                .then(() => expect(ajaxSpy.getCall(0).args[0].type).to.equal('POST'))
                .then(() => done())
                .catch(done);
        });

        it('expect post function to make a ajax request with proper url', (done) => {

            const properUrl = 'some/kind/of/proper/url';

            requester.post(properUrl)
                .then(() => expect(ajaxSpy.getCall(0).args[0].url).to.equal(properUrl))
                .then(() => done())
                .catch(done);
        });

        it('expect post function to make a ajax request with proper body, when body passed', (done) => {

            const properUrl = 'some/kind/of/proper/url',
                body = {
                    username: 'username',
                    passHash: 'HASHED_PASSWORD'
                };

            requester.post(properUrl, body)
                .then(() => expect(ajaxSpy.getCall(0).args[0].data).to.equal(JSON.stringify(body)))
                .then(() => done())
                .catch(done);
        });

        it('expect post function to make a ajax request with empty object as headers, when no headers passed', (done) => {

            requester.post()
                .then(() => expect(ajaxSpy.getCall(0).args[0].headers).to.deep.equal({}))
                .then(() => done())
                .catch(done);
        });

        it('expect post function to make a ajax request with proper headers, when headers passed', (done) => {

            const properUrl = 'some/kind/of/proper/url',
                body = {
                    username: 'username',
                    passHash: 'HASHED_PASSWORD'
                },
                headers = {
                    'x-auth-key': 'AUTHENTICATION_KEY'
                };

            requester.post(properUrl, body, headers)
                .then(() => expect(ajaxSpy.getCall(0).args[0].headers).to.equal(headers))
                .then(() => done())
                .catch(done);
        });

        it('expect post function to return a Promise', () => {

            const promise = requester.post();
            expect(promise).to.be.an.instanceof(Promise);
        });

        it('expect post function to return a Promise which resolves with with proper response', (done) => {

            requester.post()
                .then((value) => expect(value).to.equal('proper response'))
                .then(() => done())
                .catch(done);
        });
    });

    describe('Put tests', () => {
        let ajaxSpy;

        beforeEach(() => {
            ajaxSpy = sinon.spy($, 'ajax');
        });

        afterEach(() => {
            ajaxSpy.restore();
        });

        it('expect put function to make a ajax request', (done) => {

            requester.put()
                .then(() => expect(ajaxSpy).to.have.been.calledOnce)
                .then(() => done())
                .catch(done);
        });

        it('expect put function to make a ajax request with type PUT', (done) => {

            requester.put()
                .then(() => expect(ajaxSpy.getCall(0).args[0].type).to.equal('PUT'))
                .then(() => done())
                .catch(done);
        });

        it('expect put function to make a ajax request with proper url', (done) => {

            const properUrl = 'some/kind/of/proper/url';

            requester.put(properUrl)
                .then(() => expect(ajaxSpy.getCall(0).args[0].url).to.equal(properUrl))
                .then(() => done())
                .catch(done);
        });

        it('expect put function to make a ajax request with proper body, when body passed', (done) => {

            const properUrl = 'some/kind/of/proper/url',
                body = {
                    username: 'username',
                    passHash: 'HASHED_PASSWORD'
                };

            requester.put(properUrl, body)
                .then(() => expect(ajaxSpy.getCall(0).args[0].data).to.equal(JSON.stringify(body)))
                .then(() => done())
                .catch(done);
        });

        it('expect put function to make a ajax request with empty object as headers, when no headers passed', (done) => {

            requester.put()
                .then(() => expect(ajaxSpy.getCall(0).args[0].headers).to.deep.equal({}))
                .then(() => done())
                .catch(done);
        });

        it('expect put function to make a ajax request with proper headers, when headers passed', (done) => {

            const properUrl = 'some/kind/of/proper/url',
                body = {
                    username: 'username',
                    passHash: 'HASHED_PASSWORD'
                },
                headers = {
                    'x-auth-key': 'AUTHENTICATION_KEY'
                };

            requester.put(properUrl, body, headers)
                .then(() => expect(ajaxSpy.getCall(0).args[0].headers).to.equal(headers))
                .then(() => done())
                .catch(done);
        });

        it('expect put function to return a Promise', () => {

            const promise = requester.put();
            expect(promise).to.be.an.instanceof(Promise);
        });

        it('expect put function to return a Promise which resolves with with proper response', (done) => {

            requester.put()
                .then((value) => expect(value).to.equal('proper response'))
                .then(() => done())
                .catch(done);
        });

    });
});
