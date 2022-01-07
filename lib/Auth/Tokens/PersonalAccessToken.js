function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$isFunctionφ = requireDefault$__(require('../../Support/Helpers/isFunction'/*$path$*/));
var _$Encrypterφ = requireDefault$__(require('../../Foundation/Encrypter'/*$path$*/));
var _$Repositoryφ = requireDefault$__(require('../../Config/Repository'/*$path$*/));
var _$Databaseφ = requireDefault$__(require('../../Database/Database'/*$path$*/));
var _$Configφ = requireDefault$__(require('../../Database/Config'/*$path$*/));
var _$isArrayφ = requireDefault$__(require('../../Support/Helpers/isArray'/*$path$*/));
var _$isClassφ = requireDefault$__(require('../../Support/Helpers/isClass'/*$path$*/));
var _$isEmptyφ = requireDefault$__(require('../../Support/Helpers/isEmpty'/*$path$*/));
var _$isNumberφ = requireDefault$__(require('../../Support/Helpers/isNumber'/*$path$*/));
var _$isStringφ = requireDefault$__(require('../../Support/Helpers/isString'/*$path$*/));
var _$jsonwebtokenφ = requireDefault$__(require('jsonwebtoken'/*$path$*/));

const settings = {
	config: null,
	database: null,
	secret: null,
	encryption: null,
	event: null
};

class PersonalAccessToken {
	
	
	/**
	@param {String} name
	@param {Number} id
	@param {String} table
	@param {Array} abilities
	*/
	static create(name,id,table,abilities = ['*']){
		var self = this;
		
		if (!(_$isStringφ.default(name))) { throw new TypeError('name must be a string.') };
		
		if (!(_$isNumberφ.default(id))) { throw new TypeError('id must be an int.') };
		
		if (!(_$isStringφ.default(table))) { throw new TypeError('table must be a string.') };
		
		if (!(_$isArrayφ.default(abilities))) { throw new TypeError('abilities must be an array.') };
		
		let returning = null;
		
		try {
			returning = (_$Configφ.default.client == 'pg') ? ['id'] : null;
		} catch (e) { };
		
		return self.getDatabase().table('personal_access_tokens').insert({
			tokenable_type: table,
			tokenable_id: id,
			name: name,
			abilities: JSON.stringify(abilities)
		},returning).then(async function([token]) {
			
			token = (typeof token === 'object' && token.hasOwnProperty('id')) ? token.id : token;
			
			return await _$jsonwebtokenφ.default.sign({id: self.getEncryper().encrypt(token)},self.getEncryper().key(),{
				issuer: settings.config.get('app.url')
			});
		});
	}
	
	/**
	@param {String} token
	*/
	static async find(token,protocol = null){
		
		if (!(_$isStringφ.default(token))) { throw new TypeError('token must be a string.') };
		
		const response = {
			token: null,
			tokenable: null
		};
		
		const decodedToken = await this.verify(token);
		
		if (!decodedToken) { return response };
		
		token = await this.getDatabase().table('personal_access_tokens').where({id: this.getEncryper().decrypt(decodedToken.id)}).first();
		
		
		if (_$isEmptyφ.default(token)) { return response };
		
		let tokenable;
		
		if (!(_$isEmptyφ.default(settings.event))) {
			
			const results = await settings.event(token.tokenable_type,token.tokenable_id,protocol);
			
			if (!(_$isEmptyφ.default(results))) { tokenable = results };
		};
		
		if (_$isEmptyφ.default(tokenable)) {
			
			tokenable = await this.getDatabase().table(token.tokenable_type).where({id: token.tokenable_id}).first();
		};
		
		return {
			token: (!(_$isEmptyφ.default(token))) ? token : null,
			tokenable: (!(_$isEmptyφ.default(tokenable))) ? tokenable : null
		};
	}
	
	/**
	@param {Function} handler
	*/
	static onFetchAuthenticated(handler){
		
		if (settings.event !== null) {
			
			throw new Error('onFetchAuthenticated handler is already set.');
			
			return;
		};
		
		return settings.event = handler;
	}
	
	/**
	@param {Object} token
	*/
	static async using(token){
		
		return await this.getDatabase().table('personal_access_tokens').where({id: token.id}).update('last_used_at',this.getDatabase().fn.now());
	}
	
	/**
	@param {String} token
	*/
	static async destroy(token){
		
		const decodedToken = await this.verify(token);
		
		return await this.getDatabase().table('personal_access_tokens').where({id: this.getEncryper().decrypt(decodedToken.id)}).del();
	}
	
	/**
	@param {String} token
	*/
	static async verify(token){
		
		if (!(_$isStringφ.default(token))) { throw new TypeError('token must be a string.') };
		
		try {
			return await _$jsonwebtokenφ.default.verify(token,this.getEncryper().key());
		} catch (e) { };
		
		return false;
	}
	
	static getDatabase(){
		
		return settings.database ? settings.database : _$Databaseφ.default;
	}
	
	static getEncryper(){
		
		return settings.encryption ? settings.encryption : _$Encrypterφ.default;
	}
	
	/**
	@param {Database} database
	*/
	static setDatabase(database){
		
		if (!(_$isClassφ.default(database))) { throw new TypeError('database must be a valid class.') };
		
		settings.database = database;
		
		return this;
	}
	
	/**
	@param {Object} config
	*/
	static setConfig(config){
		
		if (!((config instanceof _$Repositoryφ.default))) {
			
			throw new TypeError('config must be an instance of ConfigRepository.');
		};
		
		settings.config = config;
		
		return this;
	}
	
	/**
	@param {String} secret
	*/
	static setSecret(secret){
		
		if (!(_$isStringφ.default(secret))) { throw new TypeError('secret must be a string.') };
		
		settings.secret = secret;
		
		return this;
	}
	
	/**
	@param {Encrypter} encryper
	*/
	static setEncrypter(encryper){
		
		if (!(_$isClassφ.default(encryper))) { throw new TypeError('encryper must be a valid class.') };
		
		settings.encryper = encryper;
		
		return this;
	}
};
exports.default = PersonalAccessToken;
