
const Auth = require('./Auth'/*$path$*/);
const ConfigRepository = require('../Config/Repository'/*$path$*/);
const ServiceResolver = require('../Support/ServiceResolver'/*$path$*/);

module.exports = class AuthenticationServiceResolver extends ServiceResolver {
	
	
	get protocol(){
		
		const default$ = this.app.make(ConfigRepository).get('auth.defaults.protocol');
		
		return this.app.make(ConfigRepository).get(("auth.protocols." + default$ + ".provider"));
	}
	
	get provider(){
		
		return this.app.make(ConfigRepository).get(("auth.providers." + (this.protocol)));
	}
	
	boot(){
		
		return Auth.setProvider(this.provider);
	}
};
