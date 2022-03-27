function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('../../Support/Helpers/isFunction'/*$path$*/));
var $2 = requireDefault$__(require('../../Foundation/Encrypter'/*$path$*/));
var $3 = requireDefault$__(require('../../Config/Repository'/*$path$*/));
var $4 = requireDefault$__(require('../../Database/Database'/*$path$*/));
var $5 = requireDefault$__(require('../../Database/Config'/*$path$*/));
var $6 = requireDefault$__(require('../../Support/Helpers/isArray'/*$path$*/));
var $7 = requireDefault$__(require('../../Support/Helpers/isClass'/*$path$*/));
var $8 = requireDefault$__(require('../../Support/Helpers/isEmpty'/*$path$*/));
var $9 = requireDefault$__(require('../../Support/Helpers/isNumber'/*$path$*/));
var $10 = requireDefault$__(require('../../Support/Helpers/isString'/*$path$*/));
var $11 = requireDefault$__(require('jsonwebtoken'/*$path$*/));

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
	@param {object} data
	*/
	static create(name,id,table,abilities = ['*'],data = {}){
		var self = this;
		
		if (!($10.default(name))) { throw new TypeError('name must be a string.') };
		
		if (!($9.default(id))) { throw new TypeError('id must be an int.') };
		
		if (!($10.default(table))) { throw new TypeError('table must be a string.') };
		
		if (!($6.default(abilities))) { throw new TypeError('abilities must be an array.') };
		
		let returning = null;
		
		try {
			returning = ($5.default.client == 'pg') ? ['id'] : null;
		} catch (e) { };
		
		return self.getDatabase().table('personal_access_tokens').insert({
			tokenable_type: table,
			tokenable_id: id,
			name: name,
			abilities: JSON.stringify(abilities)
		},returning).then(async function([token]) {
			
			token = (typeof token === 'object' && token.hasOwnProperty('id')) ? token.id : token;
			
			if (typeof data === 'object' && !($8.default(data))) {
				
				data = Object.assign(data,{id: self.getEncryper().encrypt(token)});
			} else {
				
				data = {id: self.getEncryper().encrypt(token)};
			};
			
			return await $11.default.sign(data,self.getEncryper().key(),{
				issuer: settings.config.get('app.url')
			});
		});
	}
	
	/**
	@param {String} token
	*/
	static async find(token,protocol = null){
		
		if (!($10.default(token))) { throw new TypeError('token must be a string.') };
		
		const response = {
			token: null,
			tokenable: null
		};
		
		const decodedToken = await this.verify(token);
		
		if (!decodedToken) { return response };
		
		token = await this.getDatabase().table('personal_access_tokens').where({id: this.getEncryper().decrypt(decodedToken.id)}).first();
		
		
		if ($8.default(token)) { return response };
		
		let tokenable;
		
		if (!($8.default(settings.event))) {
			
			const results = await settings.event(token.tokenable_type,token.tokenable_id,decodedToken,protocol);
			
			if (!($8.default(results))) { tokenable = results };
		};
		
		if ($8.default(tokenable)) {
			
			tokenable = await this.getDatabase().table(token.tokenable_type).where({id: token.tokenable_id}).first();
		};
		
		return {
			token: (!($8.default(token))) ? token : null,
			tokenable: (!($8.default(tokenable))) ? tokenable : null
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
		
		if (!($10.default(token))) { throw new TypeError('token must be a string.') };
		
		try {
			return await $11.default.verify(token,this.getEncryper().key());
		} catch (e) { };
		
		return false;
	}
	
	static getDatabase(){
		
		return settings.database ? settings.database : $4.default;
	}
	
	static getEncryper(){
		
		return settings.encryption ? settings.encryption : $2.default;
	}
	
	/**
	@param {Database} database
	*/
	static setDatabase(database){
		
		if (!($7.default(database))) { throw new TypeError('database must be a valid class.') };
		
		settings.database = database;
		
		return this;
	}
	
	/**
	@param {Object} config
	*/
	static setConfig(config){
		
		if (!((config instanceof $3.default))) {
			
			throw new TypeError('config must be an instance of ConfigRepository.');
		};
		
		settings.config = config;
		
		return this;
	}
	
	/**
	@param {String} secret
	*/
	static setSecret(secret){
		
		if (!($10.default(secret))) { throw new TypeError('secret must be a string.') };
		
		settings.secret = secret;
		
		return this;
	}
	
	/**
	@param {Encrypter} encryper
	*/
	static setEncrypter(encryper){
		
		if (!($7.default(encryper))) { throw new TypeError('encryper must be a valid class.') };
		
		settings.encryper = encryper;
		
		return this;
	}
};
exports.default = PersonalAccessToken;
