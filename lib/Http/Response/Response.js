const Ψinit = Symbol.for('#init');

const JsonResponse = require('./JsonResponse'/*$path$*/);

module.exports = class Response {
	[Ψinit]($$ = null){
		var φ;
		this.data = ($$ && (φ = $$.data) !== undefined) ? (φ) : null;
		this.statusCode = ($$ && (φ = $$.statusCode) !== undefined) ? (φ) : 200;
		
	}
	/**
	@param {any} data
	@param {Number} statusCode
	*/
	constructor(data = null,statusCode = 200){
		this[Ψinit]();
		this.data = data;
		this.statusCode = statusCode;
	}
	
	/**
	@param {Object} object
	*/
	json(object){
		
		return JsonResponse.make(object);
	}
	
	/**
	@param {Number} statusCode
	*/
	code(statusCode){
		
		return this.statusCode = statusCode;
	}
};
