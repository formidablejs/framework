
const {asObject: asObject,without: without} = require('@formidablejs/helpers'/*$path$*/);
const Auth = require('../Auth'/*$path$*/);
const AuthorizationException = require('../Exceptions/AuthorizationException'/*$path$*/);
const Driver = require('./Driver'/*$path$*/);

module.exports = class JwtDriver extends Driver {
	
	
	async verify(){
		
		if (!(this.request.hasHeader('authorization'))) {
			
			throw new AuthorizationException('Unauthorized');
		};
		
		const personalAccessToken = await this.getPersonalAccessToken();
		
		if (!personalAccessToken.token) {
			
			throw new AuthorizationException('Unauthorized');
		};
		
		return personalAccessToken;
	}
	
	/**
	@param {Object} body
	*/
	async authenticate(body){
		
		const user = asObject(await Auth.attempt(body));
		
		const token = await this.createPersonalAccessToken('auth:jwt',user.id);
		const hidden = (this.getProvider.hidden !== undefined) ? this.getProvider.hidden : [];
		
		this.afterAuthenticated(user);
		
		return {
			token: token,
			type: 'Bearer',
			user: without(user,hidden)
		};
	}
	
	/**
	@param {Object} body
	*/
	async register(body){
		
		const user = asObject(await this.insertUser(body));
		
		const token = await this.createPersonalAccessToken('auth:jwt',user.id);
		const hidden = (this.getProvider.hidden !== undefined) ? this.getProvider.hidden : [];
		
		this.sendVerificationEmail(user);
		this.afterRegistered(user);
		
		return {
			token: token,
			type: 'Bearer',
			user: without(user,hidden)
		};
	}
};
