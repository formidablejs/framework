function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$fastifyφ = require('fastify'/*$path$*/);
var _$ForbiddenExceptionφ = requireDefault$__(require('../../../Http/Exceptions/ForbiddenException'/*$path$*/));
var _$FormRequestφ = requireDefault$__(require('../../../Http/Request/FormRequest'/*$path$*/));
var _$isEmptyφ = requireDefault$__(require('../../../Support/Helpers/isEmpty'/*$path$*/));
var _$PersonalAccessTokenφ = requireDefault$__(require('../../Tokens/PersonalAccessToken'/*$path$*/));
var _$Requestφ = requireDefault$__(require('../../../Http/Request/Request'/*$path$*/));

class ErrorIfAuthenticated {
	
	
	/**
	@param {FormRequest|Request} request
	@param {FastifyReply} reply
	@param {any[]|null} params
	*/
	async handle(request,reply,params){
		var φ;
		
		if (this.isAuthenticated(request)) {
			
			const token = await _$PersonalAccessTokenφ.default.find(this.getPersonalAccessToken(request));
			
			if (!(_$isEmptyφ.default(token.token)) && !(_$isEmptyφ.default(token.tokenable))) {
				
				return this.onAuthenticated(request,reply,params);
			};
			
			(((φ = request.request.session.personal_access_token),delete request.request.session.personal_access_token, φ));
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
		
		return request.hasHeader('authorization') || !(_$isEmptyφ.default(request.request.session.personal_access_token));
	}
	
	/**
	@param {FormRequest|Request} request
	@param {FastifyReply} reply
	@param {any[]|null} params
	*/
	onAuthenticated(request,reply,params){
		
		throw new _$ForbiddenExceptionφ.default('Action not allowed.');
	}
};
exports.default = ErrorIfAuthenticated;
