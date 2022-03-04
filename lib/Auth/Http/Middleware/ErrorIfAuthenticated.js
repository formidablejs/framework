function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('fastify'/*$path$*/);
var $2 = requireDefault$__(require('../../../Http/Exceptions/ForbiddenException'/*$path$*/));
var $3 = requireDefault$__(require('../../../Http/Request/FormRequest'/*$path$*/));
var $4 = requireDefault$__(require('../../../Support/Helpers/isEmpty'/*$path$*/));
var $5 = requireDefault$__(require('../../Tokens/PersonalAccessToken'/*$path$*/));
var $6 = requireDefault$__(require('../../../Http/Request/Request'/*$path$*/));

class ErrorIfAuthenticated {
	
	
	/**
	@param {FormRequest|Request} request
	@param {FastifyReply} reply
	@param {any[]|null} params
	*/
	async handle(request,reply,params){
		var $7;
		
		if (this.isAuthenticated(request)) {
			
			const token = await $5.default.find(this.getPersonalAccessToken(request));
			
			if (!($4.default(token.token)) && !($4.default(token.tokenable))) {
				
				return this.onAuthenticated(request,reply,params);
			};
			
			((($7 = request.request.session.personal_access_token),delete request.request.session.personal_access_token, $7));
		};
		
		return request;
	}
	
	/**
	@param {FormRequest|Request} request
	*/
	getPersonalAccessToken(request){
		
		if (request.hasHeader('authorization')) { return request.bearerToken() };
		
		return request.request.session.personal_access_token;
	}
	
	/**
	@param {FormRequest|Request} request
	*/
	isAuthenticated(request){
		
		return request.hasHeader('authorization') || !($4.default(request.request.session.personal_access_token));
	}
	
	/**
	@param {FormRequest|Request} request
	@param {FastifyReply} reply
	@param {any[]|null} params
	*/
	onAuthenticated(request,reply,params){
		
		throw new $2.default('Action not allowed.');
	}
};
exports.default = ErrorIfAuthenticated;
