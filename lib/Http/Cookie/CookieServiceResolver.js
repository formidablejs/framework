function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$fastify_cookieφ = requireDefault$__(require('fastify-cookie'/*$path$*/));
var _$Encrypterφ = requireDefault$__(require('../../Foundation/Encrypter'/*$path$*/));
var _$ServiceResolverφ = requireDefault$__(require('../../Support/ServiceResolver'/*$path$*/));

class CookieServiceResolver extends _$ServiceResolverφ.default {
	
	
	/**
		 * Session config.
		 */
	
	/**
	*
		 * Session config.
		 
	*/
	get config(){
		
		return {
			secret: _$Encrypterφ.default.key(),
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
		
		return this.app.register(_$fastify_cookieφ.default,this.config);
	}
};
exports.default = CookieServiceResolver;
