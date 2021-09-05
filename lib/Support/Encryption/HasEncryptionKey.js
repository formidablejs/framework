
const URL = require('../../Http/URL/URL'/*$path$*/);
const MissingAppKeyException = require('./Exceptions/MissingAppKeyException'/*$path$*/);

module.exports = class HasEncryptionKey {
	
	
	constructor(config){
		
		this.config = config;
	}
	
	handle(request){
		
		(!(this.key())) ? (new MissingAppKeyException('No application encryption key has been specified.')) : null;
		
		URL.setSecret(this.key());
		
		return request;
	}
	
	key(){
		
		return this.config.get('app.key');
	}
};
