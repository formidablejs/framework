
const ServiceResolver = require('../Support/ServiceResolver'/*$path$*/);
const Hash = require('./Hash'/*$path$*/);

module.exports = class HashServiceResolver extends ServiceResolver {
	
	
	boot(){
		
		return Hash.configure(this.app.config.get('hashing'));
	}
};
