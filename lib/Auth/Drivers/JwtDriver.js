function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$Databaseφ = requireDefault$__(require('../../Database/Database'/*$path$*/));
var _$asObjectφ = requireDefault$__(require('../../Support/Helpers/asObject'/*$path$*/));
var _$Authφ = requireDefault$__(require('../Auth'/*$path$*/));
var _$AuthorizationExceptionφ = requireDefault$__(require('../Exceptions/AuthorizationException'/*$path$*/));
var _$Driverφ = requireDefault$__(require('./Driver'/*$path$*/));
var _$isEmptyφ = requireDefault$__(require('../../Support/Helpers/isEmpty'/*$path$*/));
var _$withoutφ = requireDefault$__(require('../../Support/Helpers/without'/*$path$*/));

class JwtDriver extends _$Driverφ.default {
	
	
	async verify(){
		
		if (!(this.request.hasHeader('authorization'))) {
			
			throw new _$AuthorizationExceptionφ.default('Unauthorized');
		};
		
		const personalAccessToken = await this.getPersonalAccessToken();
		
		if (!personalAccessToken.token) {
			
			throw new _$AuthorizationExceptionφ.default('Unauthorized');
		};
		
		this.usingPersonalAccessToken(personalAccessToken.token);
		
		return personalAccessToken;
	}
	
	/**
	@param {Object} body
	*/
	async authenticate(body){
		
		const user = _$asObjectφ.default(await _$Authφ.default.attempt(body));
		
		const token = await this.createPersonalAccessToken('auth:jwt',user.id);
		const hidden = (!(_$isEmptyφ.default(this.getProvider.hidden))) ? this.getProvider.hidden : [];
		
		const payload = {
			token: token,
			type: 'Bearer',
			user: _$withoutφ.default(user,hidden)
		};
		
		const results = await this.afterAuthenticated(user);
		
		return _$isEmptyφ.default(results) ? payload : results;
	}
	
	/**
	@param {Object} body
	*/
	async register(body){
		
		const user = _$asObjectφ.default(await this.insertUser(body));
		
		const token = await this.createPersonalAccessToken('auth:jwt',user.id);
		const hidden = (!(_$isEmptyφ.default(this.getProvider.hidden))) ? this.getProvider.hidden : [];
		
		this.sendVerificationEmail(user);
		
		const payload = {
			token: token,
			type: 'Bearer',
			user: _$withoutφ.default(user,hidden)
		};
		
		const results = this.afterRegistered(payload);
		
		return _$isEmptyφ.default(results) ? payload : results;
	}
	
	/**
	@param {Object} body
	*/
	async logout(body = new Object){
		
		const personalAccessToken = await this.getPersonalAccessToken();
		
		await _$Databaseφ.default.table('personal_access_tokens').where('id',personalAccessToken.token.id).where('tokenable_id',personalAccessToken.tokenable.id).del();
		
		
		const results = await this.afterSessionDestroyed();
		
		return _$isEmptyφ.default ? {status: 'success'} : results;
	}
};
exports.default = JwtDriver;
