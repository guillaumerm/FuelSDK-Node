const assert = require('assert');
const {clientId, clientSecret, origin, authOrigin, soapOrigin, authOptions, globalReqOptions} = require('./test.config');
const ET_Client = require('../lib/ET_Client');


describe('InteractionEvent', function () {

    this.timeout(10000);
    let client;

    before(() => {
        client = new ET_Client(clientId, clientSecret, null, {origin, authOrigin, soapOrigin, authOptions, globalReqOptions});
    });

    describe('Post', () => {
        it('should create', done => {
            const props = {
                ContactKey: 90238,
                EventDefinitionKey: '...', // Replace with valid EventDefinitionKey
                Data: {} // Fill in with valid event attribute
            };
            client.interactionEvent({props}).post((err, response) => {
                if (err) throw new Error(err);
                assert.equal(response.res.statusCode, 201);
                assert.notStrictEqual(response.body.eventInstanceId, undefined);
                done();
            });
        });
    });

});