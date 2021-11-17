function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$Encrypterφ = requireDefault$__(require('../../Foundation/Encrypter'/*$path$*/));
var _$isEmptyφ = requireDefault$__(require('../../Support/Helpers/isEmpty'/*$path$*/));
var _$ServiceResolverφ = requireDefault$__(require('../../Support/ServiceResolver'/*$path$*/));
var _$sessionφ = requireDefault$__(require('@fastify/session'/*$path$*/));
var _$DriverManagerφ = requireDefault$__(require('../Session/DriverManager'/*$path$*/));

class SessionServiceResolver extends _$ServiceResolverφ.default {
	
	
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
			store: null,
			cookieName: this.app.config.get('session.cookie'),
			cookie: {
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
		 * Boot session service resolver.
		 *
		 * @returns {void}
		 */
	
	/**
	*
		 * Boot session service resolver.
		 *
		 * @returns {void}
		 
	*/
	boot(){
		
		const driver = this.app.config.get('session.driver','memory');
		const store = _$DriverManagerφ.default.get(driver);
		
		let config = this.config;
		
		if (!(_$isEmptyφ.default(store))) { config.store = store };
		
		return this.app.register(_$sessionφ.default,config);
	}
};
exports.default = SessionServiceResolver;