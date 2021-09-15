function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$ServiceResolverφ = requireDefault$__(require('../Support/ServiceResolver'/*$path$*/));
var _$Hashφ = requireDefault$__(require('./Hash'/*$path$*/));

class HashServiceResolver extends _$ServiceResolverφ.default {
	
	
	boot(){
		
		return _$Hashφ.default.configure(this.app.config.get('hashing'));
	}
};
exports.default = HashServiceResolver;
