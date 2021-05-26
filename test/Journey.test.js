const assert = require('assert');
const {clientId, clientSecret, origin, authOrigin, soapOrigin, authOptions, globalReqOptions} = require('./test.config');
const ET_Client = require('../lib/ET_Client');


describe('Journey', function () {

    this.timeout(10000);
    let client, createdJourneyId;

    before(() => {
        client = new ET_Client(clientId, clientSecret, null, {origin, authOrigin, soapOrigin, authOptions, globalReqOptions});
    });

    describe('Post', () => {
        it('should create', done => {
            const props = {
                key: 'apiKey',
                name: 'Some test journey name',
                description: 'Journey description',
                workflowApiVersion: 1
            };
            client.journey({props}).post((err, response) => {
                if (err) throw new Error(err);
                assert.equal(response.res.statusCode, 200);
                assert.equal(response.body.name, props.name);
                assert.equal(response.body.description, props.description);
                createdJourneyId = response.body.id;
                done();
            });
        });
    });

    describe('Get', () => {
        it('should get it if createdJourneyId is passed', done => {
            client.journey({id: createdJourneyId}).get((err, response) => {
                if (err) throw new Error(err);
                assert.equal(response.res.statusCode, 200);
                assert.equal(response.body.id, createdJourneyId);
                done();
            });
        });
        it('should error 404 if random id is passed', done => {
            client.journey({id: 1234567890}).get((err, response) => {
                if (err) throw new Error(err);
                assert.equal(response.res.statusCode, 400); // api is wrong
                done();
            });
        });
    });

    describe('Delete', () => {
        it('should delete it if createdJourneyId is passed', done => {
            client.journey({id: createdJourneyId}).delete(err => {
                if (err) throw new Error(err);
                assert(!err);
                done();
            });
        });
        it('should error 404 if random id is passed', done => {
            client.journey({id: '1234567890'}).delete((err, response) => {
                if (err) throw new Error(err);
                assert.equal(response.res.statusCode, 400); // api is wrong
                done();
            });
        });
    });

});