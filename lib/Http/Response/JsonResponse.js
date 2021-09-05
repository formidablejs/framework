const Ψinit = Symbol.for('#init');

module.exports = class JsonResponse {
	[Ψinit]($$ = null){
		var φ;
		this.data = ($$ && (φ = $$.data) !== undefined) ? (φ) : {};
		this.statusCode = ($$ && (φ = $$.statusCode) !== undefined) ? (φ) : 200;
		
	}
	/**
	@param {Object} object
	*/
	constructor(object){
		this[Ψinit]();
		this.data = object;
	}
	
	/**
	@param {Object} object
	*/
	static make(object){
		
		return new JsonResponse(object);
	}
	
	/**
	@param {Number} statusCode
	*/
	code(statusCode = 200){
		
		this.statusCode = statusCode;
		
		return this;
	}
	
	toJson(reply){
		
		reply.type('application/json');
		reply.code(this.statusCode);
		
		return this.data;
	}
};
