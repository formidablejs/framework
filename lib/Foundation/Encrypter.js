function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$isObjectφ = requireDefault$__(require('../Support/Helpers/isObject'/*$path$*/));
var _$DecryptExceptionφ = requireDefault$__(require('./Exceptions/DecryptException'/*$path$*/));
var _$configφ = requireDefault$__(require('../Support/Helpers/config'/*$path$*/));
var _$cryptoφ = requireDefault$__(require('crypto'/*$path$*/));
var _$InvalidEncryptionKeyTypeExceptionφ = requireDefault$__(require('./Exceptions/InvalidEncryptionKeyTypeException'/*$path$*/));
var _$isEmptyφ = requireDefault$__(require('../Support/Helpers/isEmpty'/*$path$*/));

const settings = {
	algorithm: null,
	appKey: null
};

try {
	settings.algorithm = _$configφ.default('app.cipher','AES-256-CBC');
} catch (e) { };
try {
	settings.appKey = _$configφ.default('app.key',new String);
} catch (e) { };

class Encrypter {
	
	
	/**
	@param {Object} config
	*/
	static configure(config){
		
		if (!(_$isObjectφ.default(config))) { throw TypeError('Expected an object.') };
		
		if (!(_$isEmptyφ.default(config.algorithm))) {
			
			settings.algorithm = config.algorithm;
		};
		
		if (!(_$isEmptyφ.default(config.appKey))) {
			
			settings.appKey = config.appKey;
		};
		
		return Encrypter;
	}
	
	/**
	@param {String} type
	*/
	static appKey(type){
		
		if (!(_$isEmptyφ.default(type)) && ['key','iv'].includes(type.toLowerCase()) == false) {
			
			throw new _$InvalidEncryptionKeyTypeExceptionφ.default('Encryption key type is not valid.');
		};
		
		let key = _$configφ.default('app.key',new String);
		
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
		
		const cipher = _$cryptoφ.default.createCipheriv(this.algorithm,this.key(),this.iv());
		
		return Buffer.concat([cipher.update(JSON.stringify(value)),cipher.final()]).toString('hex');
	}
	
	/**
	@param {String} hash
	*/
	static decrypt(hash){
		
		try {
			
			const decipher = _$cryptoφ.default.createDecipheriv(this.algorithm,this.key(),this.iv());;
			
			const decrypted = Buffer.concat([decipher.update(Buffer.from(hash,'hex')),decipher.final()]).toString();
			
			return JSON.parse(decrypted);
		} catch (φ) {
			
			throw new _$DecryptExceptionφ.default('Invalid data.');
		};
	}
};
exports.default = Encrypter;
