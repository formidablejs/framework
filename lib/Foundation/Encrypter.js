function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$isStringφ = requireDefault$__(require('../Support/Helpers/isString'/*$path$*/));
var _$configφ = requireDefault$__(require('../Support/Helpers/config'/*$path$*/));
var _$cryptoφ = requireDefault$__(require('crypto'/*$path$*/));
var _$DecryptExceptionφ = requireDefault$__(require('./Exceptions/DecryptException'/*$path$*/));
var _$EncryptExceptionφ = requireDefault$__(require('./Exceptions/EncryptException'/*$path$*/));
var _$InvalidAppKeyExceptionφ = requireDefault$__(require('./Exceptions/InvalidAppKeyException'/*$path$*/));
var _$InvalidEncryptionKeyTypeExceptionφ = requireDefault$__(require('./Exceptions/InvalidEncryptionKeyTypeException'/*$path$*/));
var _$isEmptyφ = requireDefault$__(require('../Support/Helpers/isEmpty'/*$path$*/));
var _$isObjectφ = requireDefault$__(require('../Support/Helpers/isObject'/*$path$*/));

const settings = {
	algorithm: null,
	appKey: null
};

function configureEncrypter(){
	
	try {
		
		if (_$isEmptyφ.default(settings.algorithm)) {
			
			settings.algorithm = _$configφ.default('app.cipher','AES-256-CBC');
		};
		
		if (_$isEmptyφ.default(settings.appKey)) {
			
			return settings.appKey = _$configφ.default('app.key',new String);
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
		
		if (!(_$isObjectφ.default(config))) { throw TypeError('Expected an object.') };
		
		if (!(_$isEmptyφ.default(config.algorithm)) && _$isEmptyφ.default(settings.algorithm)) {
			
			settings.algorithm = config.algorithm;
		};
		
		if (!(_$isEmptyφ.default(config.appKey)) && _$isEmptyφ.default(settings.appKey)) {
			
			settings.appKey = config.appKey;
		};
		
		return Encrypter;
	}
	
	/**
	@param {String} type
	*/
	static appKey(type){
		
		configureEncrypter();
		
		if (!(_$isEmptyφ.default(type)) && ['key','iv'].includes(type.toLowerCase()) == false) {
			
			throw new _$InvalidEncryptionKeyTypeExceptionφ.default('Encryption key type is not valid.');
		};
		
		let key = _$isStringφ.default(settings.appKey) ? settings.appKey : (new String);
		
		if (key.startsWith('base64:')) {
			
			key = Buffer.from(key.split('base64:')[1],'base64').toString('utf-8');
		};
		
		if (_$isEmptyφ.default(type)) { return key };
		
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
		
		if (_$isEmptyφ.default(settings.algorithm) || _$isEmptyφ.default(settings.appKey)) {
			
			throw new _$InvalidAppKeyExceptionφ.default('Application key is not valid.');
		};
		
		try {
			
			const cipher = _$cryptoφ.default.createCipheriv(settings.algorithm,this.key(),this.iv());
			
			return Buffer.concat([cipher.update(JSON.stringify(value)),cipher.final()]).toString('hex');
		} catch (φ) {
			
			throw new _$EncryptExceptionφ.default('Encryption failed.');
		};
	}
	
	/**
	@param {String} hash
	*/
	static decrypt(hash){
		
		if (_$isEmptyφ.default(settings.algorithm) || _$isEmptyφ.default(settings.appKey)) {
			
			throw new _$InvalidAppKeyExceptionφ.default('Application key is not valid.');
		};
		
		try {
			
			const decipher = _$cryptoφ.default.createDecipheriv(settings.algorithm,this.key(),this.iv());;
			
			const decrypted = Buffer.concat([decipher.update(Buffer.from(hash,'hex')),decipher.final()]).toString();
			
			return JSON.parse(decrypted);
		} catch (φ2) {
			
			throw new _$DecryptExceptionφ.default('Invalid data.');
		};
	}
};
exports.default = Encrypter;
