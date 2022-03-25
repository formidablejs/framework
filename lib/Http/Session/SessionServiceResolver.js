function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('../../Auth/Auth'/*$path$*/));
var $2 = requireDefault$__(require('../../Foundation/Encrypter'/*$path$*/));
var $3 = requireDefault$__(require('../../Support/Helpers/isEmpty'/*$path$*/));
var $4 = requireDefault$__(require('../Redirect/Redirect'/*$path$*/));
var $5 = requireDefault$__(require('../../Support/ServiceResolver'/*$path$*/));
var $6 = requireDefault$__(require('@fastify/session'/*$path$*/));
var $7 = requireDefault$__(require('../Session/DriverManager'/*$path$*/));
var $8 = requireDefault$__(require('../../Validator/Exceptions/ValidationException'/*$path$*/));
var $9 = requireDefault$__(require('../../Auth/Tokens/PersonalAccessToken'/*$path$*/));
var $10 = requireDefault$__(require('../../Auth/Protocol'/*$path$*/));
var $11 = requireDefault$__(require('../Request/FormRequest'/*$path$*/));
var $12 = requireDefault$__(require('../../Auth/DriverManager'/*$path$*/));
class SessionServiceResolver extends $5.default {
	
	
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
		var self = this;
		
		const driver = this.app.config.get('session.driver','memory');
		const store = $7.default.get(driver);
		
		let config = this.config;
		
		if (!($3.default(store))) { config.store = store };
		
		this.app.register($6.default,config);
		
		self.app.addHook('onRequest',function(request,reply) {
			
			try {
				return self.attemptAuth(request,reply);
			} catch (e) { };
		});
		
		return self.app.onResponse(function(/**@type {ValidationException}*/response,/**@type {FormRequest}*/request,/**@type {FastifyReply}*/reply) {
			
			if ((response instanceof $8.default) && request.expectsHtml()) {
				
				request.flash('_errors',response.message.errors);
				request.flash('_old',request.body());
				
				return reply.redirect(request.header('referer')).sent = true;
			};
		});
	}
	
	/**
	@param {FastifyRequest} request
	@param {FastifyReply} reply
	*/
	async attemptAuth(request,reply){
		
		const token = await request.session.personal_access_token;
		
		if (!((typeof token === 'string' && !($3.default(token))))) {
			
			return this.remove(request);
		};
		
		// get decoded token
		const decodedToken = await $9.default.verify(token);
		
		if (decodedToken === false) { return this.remove(request) };
		
		// get auth protocol from token.
		const protocol = decodedToken.protocol || null;
		
		if ($3.default(protocol)) { return this.remove(request) };
		
		// configure auth protocol.
		$10.default.make(this.app.config).configure(protocol);
		
		// get driver manager.
		const handler = $12.default.get(
			protocol,
			new $11.default(request,{},reply,this.app.config),
			reply,
			[],
			this.app.config
		);
		
		try {
			
			const personalAccessToken = await handler.verify();
			
			request.auth = function() { return new $1.default(
				personalAccessToken.tokenable,
				personalAccessToken.token.abilities,
				handler
			); };
			
			return;
		} catch (e) { };
		
		// remove personal access token from session if verification failed.
		return this.remove(request);
	}
	
	/**
	@param {FastifyRequest} request
	*/
	remove(request){
		var $13;
		
		((($13 = request.session.personal_access_token),delete request.session.personal_access_token, $13));
		
		return;
	}
};
exports.default = SessionServiceResolver;
