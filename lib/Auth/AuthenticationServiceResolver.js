function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('./Auth'/*$path$*/));
var $2 = requireDefault$__(require('../Config/Repository'/*$path$*/));
var $3 = requireDefault$__(require('../Support/ServiceResolver'/*$path$*/));

class AuthenticationServiceResolver extends $3.default {
	
	
	get protocol(){
		
		const default$ = this.app.make($2.default).get('auth.defaults.protocol');
		
		return this.app.make($2.default).get(("auth.protocols." + default$ + ".provider"));
	}
	
	get provider(){
		
		return this.app.make($2.default).get(("auth.providers." + (this.protocol)));
	}
	
	boot(){
		
		return $1.default.setProvider(this.provider);
	}
};
exports.default = AuthenticationServiceResolver;
