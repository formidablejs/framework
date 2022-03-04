function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('../../Foundation/Encrypter'/*$path$*/));
var $2 = requireDefault$__(require('../../Support/Helpers/isEmpty'/*$path$*/));
var $3 = requireDefault$__(require('../Redirect/Redirect'/*$path$*/));
var $4 = requireDefault$__(require('../../Support/ServiceResolver'/*$path$*/));
var $5 = requireDefault$__(require('@fastify/session'/*$path$*/));
var $6 = requireDefault$__(require('../Session/DriverManager'/*$path$*/));
var $7 = requireDefault$__(require('../../Validator/Exceptions/ValidationException'/*$path$*/));
class SessionServiceResolver extends $4.default {
	
	
	/**
		 * Session config.
		 */
	
	/**
	*
		 * Session config.
		 
	*/
	get config(){
		
		return {
			secret: $1.default.key(),
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
		const store = $6.default.get(driver);
		
		let config = this.config;
		
		if (!($2.default(store))) { config.store = store };
		
		this.app.register($5.default,config);
		
		return this.app.onResponse(function(/**@type {ValidationException}*/response,/**@type {FormRequest}*/request,/**@type {FastifyReply}*/reply) {
			
			if ((response instanceof $7.default) && request.expectsHtml()) {
				
				request.flash('_errors',response.message.errors);
				request.flash('_old',request.body());
				
				return reply.redirect(request.header('referer')).sent = true;
			};
		});
	}
};
exports.default = SessionServiceResolver;
