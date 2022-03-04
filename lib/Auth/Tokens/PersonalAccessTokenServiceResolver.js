function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('../../Foundation/Encrypter'/*$path$*/));
var $2 = requireDefault$__(require('./PersonalAccessToken'/*$path$*/));
var $3 = requireDefault$__(require('../../Support/ServiceResolver'/*$path$*/));

class PersonalAccessTokenServiceResolver extends $3.default {
	
	
	boot(){
		
		return $2.default.setConfig(this.app.config).setEncrypter($1.default);
	}
};
exports.default = PersonalAccessTokenServiceResolver;
