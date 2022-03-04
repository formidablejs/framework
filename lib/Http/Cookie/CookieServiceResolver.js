function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('fastify-cookie'/*$path$*/));
var $2 = requireDefault$__(require('../../Foundation/Encrypter'/*$path$*/));
var $3 = requireDefault$__(require('../../Support/ServiceResolver'/*$path$*/));

class CookieServiceResolver extends $3.default {
	
	
	/**
		 * Session config.
		 */
	
	/**
	*
		 * Session config.
		 
	*/
	get config(){
		
		return {
			secret: $2.default.key(),
			parseOptions: {
				domain: this.app.config.get('session.domain'),
				httpOnly: this.app.config.get('session.http_only'),
				maxAge: this.app.config.get('session.lifetime'),
				path: this.app.config.get('session.path'),
				sameSite: this.app.config.get('session.same_site'),
				secure: this.app.config.get('session.secure'),
				signed: this.app.config.get('session.encrypt')
			}
		};
	}
	
	/**
		 * Boot cookie service resolver.
		 *
		 * @returns {void}
		 */
	
	/**
	*
		 * Boot cookie service resolver.
		 *
		 * @returns {void}
		 
	*/
	boot(){
		
		return this.app.register($1.default,this.config);
	}
};
exports.default = CookieServiceResolver;
