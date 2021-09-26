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

class ErrorIfAuthenticated {
	
	
	/**
	@param {FormRequest} request
	@param {FastifyReply} reply
	@param {any[]|null} params
	*/
	async handle(request,reply,params){
		var φ;
		
		if (this.isAuthenticated(request)) {
			
			const token = await _$PersonalAccessTokenφ.default.find(request.request.session.personal_access_token);
			
			if (!(_$isEmptyφ.default(token.token)) || !(_$isEmptyφ.default(token.tokenable))) {
				
				(((φ = request.request.session.personal_access_token),delete request.request.session.personal_access_token, φ));
				
				return this.onAuthenticated(request,reply,params);
			};
		};
		
		return request;
	}
	
	/**
	@param {FormRequest} request
	*/
	isAuthenticated(request){
		
		return request.hasHeader('authorization') || !(_$isEmptyφ.default(request.request.session.personal_access_token));
	}
	
	/**
	@param {FormRequest} request
	@param {FastifyReply} reply
	@param {any[]|null} params
	*/
	onAuthenticated(request,reply,params){
		
		throw new _$ForbiddenExceptionφ.default('Action not allowed.');
	}
};
exports.default = ErrorIfAuthenticated;
