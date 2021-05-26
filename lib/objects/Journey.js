var querystring = require('querystring');

var Journey = function (parent, options) {

    this.parent = parent;
    this.endpoint = `${this.parent.RestClient.origin}/interaction/v1/interactions`;

    this.config = options;
};

Journey.prototype.post = function(cb) {
    const options = {
        uri: this.endpoint
        ,body: JSON.stringify(this.config.props)
    };

    this.parent.RestClient
        .post(options)
        .then(function(response) {
            cb(null, response);
        }.bind(this))
        .catch(function(err) {
            cb(err,null);
        }.bind(this));
};


Journey.prototype.delete = function(cb) {
    if(!this.config.id && !this.config.key) {
        cb({error: 'An id or key is required for journey deletion', documentation: 'https://developer.salesforce.com/docs/atlas.en-us.noversion.mc-apis.meta/mc-apis/deleteInteractionById.htm'})
    } else {
        const options = {
            uri: this.endpoint + '/' + this.config.id ? this.config.id : `key:${this.config.key}`
        }

        this.parent.RestClient
            .delete(options)
            .then(function(response) {
                cb(null,response);
            }.bind(this))
            .catch(function (err) {
                if (err.message === 'API did not return JSON') { // should be fixed on fuel-
                    return cb(null, {});
                }
                cb(err, null);
            })
    }
}


Journey.prototype.get = function(cb) {
    const options = {};
    if (this.config.id && this.config.id !== '') {
        options.uri = `${this.endpoint}/${this.config.id}`
    } else if(this.config.key) {
        options.uri = `${this.endpoint}/key:${this.config.key}`
    }
    if (this.config.props) options.uri += `?${querystring.stringify(this.config.props)}`;


    this.parent.RestClient
        .get(options)
        .then(function(response) {
            cb(null, response);
        }.bind(this))
        .catch(function(err) {
            cb(err,null);
        }.bind(this));
};

module.exports = Journey;