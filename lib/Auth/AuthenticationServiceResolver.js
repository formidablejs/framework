function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$Authφ = requireDefault$__(require('./Auth'/*$path$*/));
var _$Repositoryφ = requireDefault$__(require('../Config/Repository'/*$path$*/));
var _$ServiceResolverφ = requireDefault$__(require('../Support/ServiceResolver'/*$path$*/));

class AuthenticationServiceResolver extends _$ServiceResolverφ.default {
	
	
	get protocol(){
		
		const default$ = this.app.make(_$Repositoryφ.default).get('auth.defaults.protocol');
		
		return this.app.make(_$Repositoryφ.default).get(("auth.protocols." + default$ + ".provider"));
	}
	
	get provider(){
		
		return this.app.make(_$Repositoryφ.default).get(("auth.providers." + (this.protocol)));
	}
	
	boot(){
		
		return _$Authφ.default.setProvider(this.provider);
	}
};
exports.default = AuthenticationServiceResolver;
