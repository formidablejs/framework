function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$Encrypterφ = requireDefault$__(require('../../Foundation/Encrypter'/*$path$*/));
var _$PersonalAccessTokenφ = requireDefault$__(require('./PersonalAccessToken'/*$path$*/));
var _$ServiceResolverφ = requireDefault$__(require('../../Support/ServiceResolver'/*$path$*/));

class PersonalAccessTokenServiceResolver extends _$ServiceResolverφ.default {
	
	
	boot(){
		
		return _$PersonalAccessTokenφ.default.setConfig(this.app.config).setSecret(_$Encrypterφ.default.key());
	}
};
exports.default = PersonalAccessTokenServiceResolver;
