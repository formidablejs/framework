function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('../../Support/Helpers'/*$path$*/);
var $2 = requireDefault$__(require('../Auth'/*$path$*/));
var $3 = requireDefault$__(require('../Exceptions/AuthorizationException'/*$path$*/));
var $4 = requireDefault$__(require('../../Http/Exceptions/BadRequestException'/*$path$*/));
var $5 = requireDefault$__(require('../../Database/Database'/*$path$*/));
var $6 = requireDefault$__(require('../../Support/Helpers/decrypt'/*$path$*/));
var $7 = requireDefault$__(require('./Driver'/*$path$*/));
var $8 = requireDefault$__(require('../../Support/Helpers/encrypt'/*$path$*/));
var $9 = requireDefault$__(require('../../Support/Helpers/isEmpty'/*$path$*/));
var $10 = requireDefault$__(require('../../Support/Helpers/isString'/*$path$*/));
var $11 = requireDefault$__(require('../../Support/Helpers/now'/*$path$*/));
var $12 = requireDefault$__(require('../../Support/Helpers/strRandom'/*$path$*/));

class SessionDriver extends $7.default {
	
	
	async verify(){
		
		const token = await this.request.request.session.personal_access_token;
		
		const personalAccessToken = await this.getPersonalAccessToken(
			(!($9.default(token))) ? token : (new String)
		);
		
		if (!personalAccessToken.token) {
			
			const renewedSession = await this.renewSession();
			
			if (!($9.default(renewedSession))) { return renewedSession };
			
			throw new $3.default('Unauthorized');
		};
		
		this.usingPersonalAccessToken(personalAccessToken.token);
		
		return personalAccessToken;
	}
	
	async renewSession(){
		
		if (!($9.default(this.request.request.cookies.remember))) {
			
			const remember = this.request.request.cookies.remember;
			
			if ($10.default(remember)) {
				
				const user = await $5.default.table(this.getProvider.table).where('remember_token',$8.default(remember)).first();
				
				
				if (!($9.default(user))) {
					
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
		
		const user = await $2.default.attempt(body);
		
		await this.attempt('auth:session',user);
		
		if (!($9.default(body.remember_me)) && body.remember_me === true) {
			
			const token = $12.default(80);
			
			await $5.default.table(this.getProvider.table).where('id',user.id).update({
				remember_token: $8.default(token),
				updated_at: $11.default()
			});
			
			
			const session = this.config.get('session');
			
			this.reply.setCookie('remember',token,{
				domain: session.domain,
				httpOnly: session.http_only,
				maxAge: this.config.get('auth.remember',60 * 60 * 24 * 180),
				path: session.path,
				sameSite: session.same_site,
				secure: session.secure
			});
		};
		
		const results = await this.afterAuthenticated(user);
		
		return $9.default(results) ? {status: 'success'} : results;
	}
	
	/**
	@param {Object} body
	*/
	async register(body){
		
		const user = await this.insertUser(body);
		
		await this.attempt('auth:session',user);
		
		this.sendVerificationEmail(user);
		
		if (!($9.default(body.remember_me)) && body.remember_me === true) {
			
			const token = $12.default(80);
			
			await $5.default.table(this.getProvider.table).where('id',user.id).update({
				remember_token: $8.default(token),
				updated_at: $11.default()
			});
			
			
			const session = this.config.get('session');
			
			this.reply.setCookie('remember',token,{
				domain: session.domain,
				httpOnly: session.http_only,
				maxAge: this.config.get('auth.remember',60 * 60 * 24 * 180),
				path: session.path,
				sameSite: session.same_site,
				secure: session.secure
			});
		};
		
		const results = await this.afterRegistered(user);
		
		return $9.default(results) ? {status: 'success'} : results;
	}
	
	/**
	@param {Object} body
	*/
	async logout(body = new Object){
		var $13;
		
		const userId = this.request.auth().user().id;
		const remember = this.request.request.cookies.remember;
		
		if ($9.default(userId) == false && $9.default(remember) == false) {
			
			await $5.default.table(this.getProvider.table).where('id',userId).where('remember_token',$8.default(remember)).update('remember_token',null);
		};
		
		const token = await this.request.request.session.personal_access_token;
		
		const destroyed = await this.destroy((token != null && token != undefined) ? token : (new String));
		
		if (!destroyed) { throw new $4.default('User logout failed.') };
		
		((($13 = this.request.request.session.personal_access_token),delete this.request.request.session.personal_access_token, $13));
		
		this.request.request.sessionStore.destroy(this.request.request.session.sessionId,function() { return null; });
		
		const results = await this.afterSessionDestroyed();
		
		return $9.default ? {status: 'success'} : results;
	}
};
exports.default = SessionDriver;
