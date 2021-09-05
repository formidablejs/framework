
const {FastifyRequest: FastifyRequest,FastifyReply: FastifyReply} = require('fastify'/*$path$*/);
const Model = require('../../Database/Model'/*$path$*/);
const FormRequest = require('../../Http/Request/FormRequest'/*$path$*/);
const ValidationException = require('../../Validator/Exceptions/ValidationException'/*$path$*/);

module.exports = function use(target,key,descriptor){
	
	const value = descriptor.value;
	
	const definition = this;
	
	const config = {
		reply: null,
		request: null,
		validator: null
	};
	
	descriptor.value = async function() {
		
		const args = [];
		
		const request = arguments[0];
		const reply = arguments[1];
		
		config.request = request;
		
		await definition.forEach(function(object,key) {
			var φ;
			
			let response = null;
			
			if (Model.isPrototypeOf(object)) {
				
				const param = Object.keys(request.request.params)[key];
				const value = Object.values(request.request.params)[key];
				const column = (param.split(':')[1] != null) ? param.split(':')[1] : ((((φ = object.routeKeyName) != null) ? (φ) : 'id'));
				
				response = new object({[column]: value}).fetch();
			} else if (object == FormRequest) {
				
				response = request;
			} else if (object == FastifyReply) {
				
				response = reply;
			} else if (object == FastifyRequest) {
				
				response = request.request;
			} else if ((FormRequest.isPrototypeOf(object))) {
				
				response = new object(
					request.request,
					request.route,
					reply.raw,
					request.configRepository
				);
				
				if (!(response.passesAuthorization())) { response.failedAuthorization() };
				
				Object.keys(request).map(function(key) { return response[key] = request[key]; });
				
				const validator = response.validate();
				
				if ((validator.fails())) {
					
					throw ValidationException.withMessages(validator.errors.errors);
				};
			} else {
				
				response = (!!object.prototype && !!object.prototype.constructor.name) ? (new object) : object;
			};
			
			return args.push(response);
		});
		
		return value.apply(this,args);
	};
	
	return descriptor;
};
