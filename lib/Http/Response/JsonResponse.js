const $1 = Symbol.for('#__init__'), $4 = Symbol.for('#__initor__'), $5 = Symbol.for('#__inited__'), $2 = Symbol.for('#__hooks__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
class JsonResponse {
	[$1]($$ = null){
		var $3;
		this.data = ($$ && ($3 = $$.data) !== undefined) ? ($3) : {};
		this.statusCode = ($$ && ($3 = $$.statusCode) !== undefined) ? ($3) : 200;
		
	}
	/**
	@param {Object} object
	*/
	constructor(object){
		this[$1]();
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
exports.default = JsonResponse;
