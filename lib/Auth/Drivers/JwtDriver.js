function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$asObjectφ = requireDefault$__(require('../../Support/Helpers/asObject'/*$path$*/));
var _$Authφ = requireDefault$__(require('../Auth'/*$path$*/));
var _$AuthorizationExceptionφ = requireDefault$__(require('../Exceptions/AuthorizationException'/*$path$*/));
var _$Driverφ = requireDefault$__(require('./Driver'/*$path$*/));
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
		
		return personalAccessToken;
	}
	
	/**
	@param {Object} body
	*/
	async authenticate(body){
		
		const user = _$asObjectφ.default(await _$Authφ.default.attempt(body));
		
		const token = await this.createPersonalAccessToken('auth:jwt',user.id);
		const hidden = (this.getProvider.hidden !== undefined) ? this.getProvider.hidden : [];
		
		this.afterAuthenticated(user);
		
		return {
			token: token,
			type: 'Bearer',
			user: _$withoutφ.default(user,hidden)
		};
	}
	
	/**
	@param {Object} body
	*/
	async register(body){
		
		const user = _$asObjectφ.default(await this.insertUser(body));
		
		const token = await this.createPersonalAccessToken('auth:jwt',user.id);
		const hidden = (this.getProvider.hidden !== undefined) ? this.getProvider.hidden : [];
		
		this.sendVerificationEmail(user);
		this.afterRegistered(user);
		
		return {
			token: token,
			type: 'Bearer',
			user: _$withoutφ.default(user,hidden)
		};
	}
};
exports.default = JwtDriver;
