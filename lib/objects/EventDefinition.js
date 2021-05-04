var EventDefinition = function (parent, options) {

    this.parent = parent;
    this.endpoint = `${this.parent.RestClient.origin}/interaction/v1/eventDefinitions`;

    this.config = options;
}


EventDefinition.prototype.get = function(cb) {
    var parameter = ''

    if (this.config.key) {
        parameter = `key:${this.config.key}`
    } else if(this.config.id) {
        parameter = this.config.id
    }
    var options = {
        uri: `${this.endpoint}/${parameter}`
    }

    this.parent.RestClient
        .get(options)
        .then(function(response) {
            cb(null, response);
        }.bind(this))
        .catch(function(err) {
            cb(err,null);
        }.bind(this));
}

module.exports = EventDefinition;