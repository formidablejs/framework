
const Auth = require('../Auth'/*$path$*/);
const AuthorizationException = require('../Exceptions/AuthorizationException'/*$path$*/);
const Driver = require('./Driver'/*$path$*/);
const BadRequestException = require('../../Http/Exceptions/BadRequestException'/*$path$*/);

module.exports = class SessionDriver extends Driver {
	
	
	async verify(){
		
		const token = await this.request.request.session.personal_access_token;
		
		const personalAccessToken = await this.getPersonalAccessToken(
			(token != null || token != undefined) ? token : (new String)
		);
		
		if (!personalAccessToken.token) {
			
			throw new AuthorizationException('Unauthorized');
		};
		
		return personalAccessToken;
	}
	
	/**
	@param {Object} body
	*/
	async authenticate(body){
		
		const user = await Auth.attempt(body);
		
		this.request.request.session.personal_access_token = await this.createPersonalAccessToken('auth:session',user.id);
		
		
		this.afterAuthenticated(user);
		
		return {status: 'success'};
	}
	
	/**
	@param {Object} body
	*/
	async register(body){
		
		const user = await this.insertUser(body);
		
		this.request.request.session.personal_access_token = await this.createPersonalAccessToken('auth:session',user.id);
		
		
		this.sendVerificationEmail(user);
		this.afterRegistered(user);
		
		return {status: 'success'};
	}
	
	/**
	@param {Object} body
	*/
	async logout(body = new Object){
		var φ;
		
		const token = await this.request.request.session.personal_access_token;
		
		const destroyed = await this.destroy((token != null && token != undefined) ? token : (new String));
		
		if (!destroyed) { throw new BadRequestException('User logout failed.') };
		
		(((φ = this.request.request.session.personal_access_token),delete this.request.request.session.personal_access_token, φ));
		
		this.request.request.sessionStore.destroy(this.request.request.session.sessionId,function() { return null; });
		
		return {
			status: 'success'
		};
	}
};
