var InteractionEvent = function (parent, options) {

    this.parent = parent;
    this.endpoint = `${this.parent.RestClient.origin}/interaction/v1/events`;

    this.config = options;

    if (this.config.props.ContactKey === undefined) {
        throw Error('Property ContactKey must be defined');
    } else if (this.config.props.EventDefinitionKey === undefined) {
        throw Error('Property EventDefinitionKey must be defined');
    } 
}


InteractionEvent.prototype.post = function(cb) {
    var options = {
        uri: this.endpoint,
        body: JSON.stringify(this.config.props)
    }

    this.parent.RestClient
        .post(options)
        .then(function(response) {
            cb(null, response);
        }.bind(this))
        .catch(function(err) {
            cb(err,null);
        }.bind(this));
}

module.exports = InteractionEvent;