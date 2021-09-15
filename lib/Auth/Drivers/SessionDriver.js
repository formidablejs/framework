function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$Authφ = requireDefault$__(require('../Auth'/*$path$*/));
var _$AuthorizationExceptionφ = requireDefault$__(require('../Exceptions/AuthorizationException'/*$path$*/));
var _$Driverφ = requireDefault$__(require('./Driver'/*$path$*/));
var _$BadRequestExceptionφ = requireDefault$__(require('../../Http/Exceptions/BadRequestException'/*$path$*/));

class SessionDriver extends _$Driverφ.default {
	
	
	async verify(){
		
		const token = await this.request.request.session.personal_access_token;
		
		const personalAccessToken = await this.getPersonalAccessToken(
			(token != null || token != undefined) ? token : (new String)
		);
		
		if (!personalAccessToken.token) {
			
			throw new _$AuthorizationExceptionφ.default('Unauthorized');
		};
		
		return personalAccessToken;
	}
	
	/**
	@param {Object} body
	*/
	async authenticate(body){
		
		const user = await _$Authφ.default.attempt(body);
		
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
		
		if (!destroyed) { throw new _$BadRequestExceptionφ.default('User logout failed.') };
		
		(((φ = this.request.request.session.personal_access_token),delete this.request.request.session.personal_access_token, φ));
		
		this.request.request.sessionStore.destroy(this.request.request.session.sessionId,function() { return null; });
		
		return {
			status: 'success'
		};
	}
};
exports.default = SessionDriver;
