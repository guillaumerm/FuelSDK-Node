const assert = require('assert');
const {clientId, clientSecret, origin, authOrigin, soapOrigin, authOptions, globalReqOptions} = require('./test.config');
const ET_Client = require('../lib/ET_Client');


describe('EventDefinition', function () {

    this.timeout(10000);
    let client;

    before(() => {
        client = new ET_Client(clientId, clientSecret, null, {origin, authOrigin, soapOrigin, authOptions, globalReqOptions});
    });

    describe('Get', () => {
        it('should retrieve by key', done => {
            const eventDefinitionKey = 'APIEvent-5655193d-186a-9848-f84a-92026087e0d6';
            client.eventDefinition({ key: eventDefinitionKey }).get((err, response) => {
                if (err) throw new Error(err);
                assert.equal(response.res.statusCode, 200);
                assert.strictEqual(response.body.eventDefinitionKey, eventDefinitionKey);
                done();
            });
        });
        it('should retrieve by id', done => {
            const eventDefinitionId = 'f1faebe5-0ec8-4470-9f07-a9db47487470';
            client.eventDefinition({ id: eventDefinitionId }).get((err, response) => {
                if (err) throw new Error(err);
                assert.strictEqual(response.res.statusCode, 200);
                assert.strictEqual(response.body.id, eventDefinitionId);
                done();
            });
        })
    });

});