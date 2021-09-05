
const PersonalAccessToken = require('./PersonalAccessToken'/*$path$*/);
const ServiceResolver = require('../../Support/ServiceResolver'/*$path$*/);

module.exports = class PersonalAccessTokenServiceResolver extends ServiceResolver {
	
	
	boot(){
		
		return PersonalAccessToken.setConfig(this.app.config).setSecret(this.app.config.get('app.key'));
	}
};
