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
});