function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('../Support/Helpers/isString'/*$path$*/));
var $2 = requireDefault$__(require('../Support/Helpers/config'/*$path$*/));
var $3 = requireDefault$__(require('crypto'/*$path$*/));
var $4 = requireDefault$__(require('./Exceptions/DecryptException'/*$path$*/));
var $5 = requireDefault$__(require('./Exceptions/EncryptException'/*$path$*/));
var $6 = requireDefault$__(require('./Exceptions/InvalidAppKeyException'/*$path$*/));
var $7 = requireDefault$__(require('./Exceptions/InvalidEncryptionKeyTypeException'/*$path$*/));
var $8 = requireDefault$__(require('../Support/Helpers/isEmpty'/*$path$*/));
var $9 = requireDefault$__(require('../Support/Helpers/isObject'/*$path$*/));

const settings = {
	algorithm: null,
	appKey: null
};

function configureEncrypter(){
	
	try {
		
		if ($8.default(settings.algorithm)) {
			
			settings.algorithm = $2.default('app.cipher','AES-256-CBC');
		};
		
		if ($8.default(settings.appKey)) {
			
			return settings.appKey = $2.default('app.key',new String);
		};
	} catch (e) {
		
	};
};

configureEncrypter();

class Encrypter {
	
	
	/**
	@param {Object} config
	*/
	static configure(config){
		
		if (!($9.default(config))) { throw TypeError('Expected an object.') };
		
		if (!($8.default(config.algorithm)) && $8.default(settings.algorithm)) {
			
			settings.algorithm = config.algorithm;
		};
		
		if (!($8.default(config.appKey)) && $8.default(settings.appKey)) {
			
			settings.appKey = config.appKey;
		};
		
		return Encrypter;
	}
	
	/**
	@param {String} type
	*/
	static appKey(type){
		
		configureEncrypter();
		
		if (!($8.default(type)) && ['key','iv'].includes(type.toLowerCase()) == false) {
			
			throw new $7.default('Encryption key type is not valid.');
		};
		
		let key = $1.default(settings.appKey) ? settings.appKey : (new String);
		
		if (key.startsWith('base64:')) {
			
			key = Buffer.from(key.split('base64:')[1],'base64').toString('utf-8');
		};
		
		if ($8.default(type)) { return key };
		
		if (type.toLowerCase() == 'key') { return key.split(':')[0] };
		
		if (type.toLowerCase() == 'iv') { return key.split(':')[1] };
	}
	
	static key(){
		
		return this.appKey('key');
	}
	
	static iv(){
		
		return this.appKey('iv');
	}
	
	/**
	@param {any} value
	*/
	static encrypt(value){
		
		if ($8.default(settings.algorithm) || $8.default(settings.appKey)) {
			
			throw new $6.default('Application key is not valid.');
		};
		
		try {
			
			const cipher = $3.default.createCipheriv(settings.algorithm,this.key(),this.iv());
			
			return Buffer.concat([cipher.update(JSON.stringify(value)),cipher.final()]).toString('hex');
		} catch ($10) {
			
			throw new $5.default('Encryption failed.');
		};
	}
	
	/**
	@param {String} hash
	*/
	static decrypt(hash){
		
		if ($8.default(settings.algorithm) || $8.default(settings.appKey)) {
			
			throw new $6.default('Application key is not valid.');
		};
		
		try {
			
			const decipher = $3.default.createDecipheriv(settings.algorithm,this.key(),this.iv());;
			
			const decrypted = Buffer.concat([decipher.update(Buffer.from(hash,'hex')),decipher.final()]).toString();
			
			return JSON.parse(decrypted);
		} catch ($11) {
			
			throw new $4.default('Invalid data.');
		};
	}
};
exports.default = Encrypter;
