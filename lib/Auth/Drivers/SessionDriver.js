function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$Helpersφ = require('../../Support/Helpers'/*$path$*/);
var _$Authφ = requireDefault$__(require('../Auth'/*$path$*/));
var _$AuthorizationExceptionφ = requireDefault$__(require('../Exceptions/AuthorizationException'/*$path$*/));
var _$BadRequestExceptionφ = requireDefault$__(require('../../Http/Exceptions/BadRequestException'/*$path$*/));
var _$Databaseφ = requireDefault$__(require('../../Database/Database'/*$path$*/));
var _$decryptφ = requireDefault$__(require('../../Support/Helpers/decrypt'/*$path$*/));
var _$Driverφ = requireDefault$__(require('./Driver'/*$path$*/));
var _$encryptφ = requireDefault$__(require('../../Support/Helpers/encrypt'/*$path$*/));
var _$isEmptyφ = requireDefault$__(require('../../Support/Helpers/isEmpty'/*$path$*/));
var _$isStringφ = requireDefault$__(require('../../Support/Helpers/isString'/*$path$*/));
var _$nowφ = requireDefault$__(require('../../Support/Helpers/now'/*$path$*/));
var _$strRandomφ = requireDefault$__(require('../../Support/Helpers/strRandom'/*$path$*/));

class SessionDriver extends _$Driverφ.default {
	
	
	async verify(){
		
		const token = await this.request.request.session.personal_access_token;
		
		const personalAccessToken = await this.getPersonalAccessToken(
			(!(_$isEmptyφ.default(token))) ? token : (new String)
		);
		
		if (!personalAccessToken.token) {
			
			const renewedSession = await this.renewSession();
			
			if (!(_$isEmptyφ.default(renewedSession))) { return renewedSession };
			
			throw new _$AuthorizationExceptionφ.default('Unauthorized');
		};
		
		this.usingPersonalAccessToken(personalAccessToken.token);
		
		return personalAccessToken;
	}
	
	async renewSession(){
		
		if (!(_$isEmptyφ.default(this.request.request.cookies.remember))) {
			
			const remember = this.request.request.cookies.remember;
			
			if (_$isStringφ.default(remember)) {
				
				const user = await _$Databaseφ.default.table(this.getProvider.table).where('remember_token',_$encryptφ.default(remember)).first();
				
				
				if (!(_$isEmptyφ.default(user))) {
					
					return await this.attempt('auth:session',user);
				};
			};
		};
		
		return false;
	}
	
	
	/**
	@param {Object} body
	*/
	async authenticate(body){
		
		const user = await _$Authφ.default.attempt(body);
		
		await this.attempt('auth:session',user);
		
		await this.afterAuthenticated(user);
		
		if (!(_$isEmptyφ.default(body.remember_me)) && body.remember_me === true) {
			
			return await this.addRememberMeToken(user);
		};
		
		return {status: 'success'};
	}
	
	/**
	@param {Object} user
	*/
	async addRememberMeToken(user){
		
		const token = _$strRandomφ.default(64);
		
		await _$Databaseφ.default.table(this.getProvider.table).where('id',user.id).update({
			remember_token: _$encryptφ.default(token),
			updated_at: _$nowφ.default()
		});
		
		
		const session = this.config.get('session');
		
		return this.reply.setCookie('remember',token,{
			domain: session.domain,
			httpOnly: session.http_only,
			maxAge: this.config.get('auth.remember',_$Helpersφ.ms('6 months')),
			path: session.path,
			sameSite: session.same_site,
			secure: session.secure
		}).send({status: 'success'});
	}
	
	/**
	@param {Object} body
	*/
	async register(body){
		
		const user = await this.insertUser(body);
		
		await this.attempt('auth:session',user);
		
		this.sendVerificationEmail(user);
		
		await this.afterRegistered(user);
		
		if (!(_$isEmptyφ.default(body.remember_me)) && body.remember_me === true) {
			
			return await this.addRememberMeToken(user);
		};
		
		return {status: 'success'};
	}
	
	/**
	@param {Object} body
	*/
	async logout(body = new Object){
		var φ;
		
		const userId = this.request.auth().user().id;
		const remember = this.request.request.cookies.remember;
		
		if (_$isEmptyφ.default(userId) == false && _$isEmptyφ.default(remember) == false) {
			
			await _$Databaseφ.default.table(this.getProvider.table).where('id',userId).where('remember_token',_$encryptφ.default(remember)).update('remember_token',null);
		};
		
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
