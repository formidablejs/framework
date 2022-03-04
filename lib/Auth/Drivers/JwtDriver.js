function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('../../Database/Database'/*$path$*/));
var $2 = requireDefault$__(require('../../Support/Helpers/asObject'/*$path$*/));
var $3 = requireDefault$__(require('../Auth'/*$path$*/));
var $4 = requireDefault$__(require('../Exceptions/AuthorizationException'/*$path$*/));
var $5 = requireDefault$__(require('./Driver'/*$path$*/));
var $6 = requireDefault$__(require('../../Support/Helpers/isEmpty'/*$path$*/));
var $7 = requireDefault$__(require('../../Support/Helpers/without'/*$path$*/));

class JwtDriver extends $5.default {
	
	
	async verify(){
		
		if (!(this.request.hasHeader('authorization'))) {
			
			throw new $4.default('Unauthorized');
		};
		
		const personalAccessToken = await this.getPersonalAccessToken();
		
		if (!personalAccessToken.token) {
			
			throw new $4.default('Unauthorized');
		};
		
		this.usingPersonalAccessToken(personalAccessToken.token);
		
		return personalAccessToken;
	}
	
	/**
	@param {Object} body
	*/
	async authenticate(body){
		
		const user = $2.default(await $3.default.attempt(body));
		
		const token = await this.createPersonalAccessToken('auth:jwt',user.id);
		const hidden = (!($6.default(this.getProvider.hidden))) ? this.getProvider.hidden : [];
		
		const payload = {
			token: token,
			type: 'Bearer',
			user: $7.default(user,hidden)
		};
		
		const results = await this.afterAuthenticated(user);
		
		return $6.default(results) ? payload : results;
	}
	
	/**
	@param {Object} body
	*/
	async register(body){
		
		const user = $2.default(await this.insertUser(body));
		
		const token = await this.createPersonalAccessToken('auth:jwt',user.id);
		const hidden = (!($6.default(this.getProvider.hidden))) ? this.getProvider.hidden : [];
		
		this.sendVerificationEmail(user);
		
		const payload = {
			token: token,
			type: 'Bearer',
			user: $7.default(user,hidden)
		};
		
		const results = this.afterRegistered(payload);
		
		return $6.default(results) ? payload : results;
	}
	
	/**
	@param {Object} body
	*/
	async logout(body = new Object){
		
		const personalAccessToken = await this.getPersonalAccessToken();
		
		await $1.default.table('personal_access_tokens').where('id',personalAccessToken.token.id).where('tokenable_id',personalAccessToken.tokenable.id).del();
		
		
		const results = await this.afterSessionDestroyed();
		
		return $6.default ? {status: 'success'} : results;
	}
};
exports.default = JwtDriver;
