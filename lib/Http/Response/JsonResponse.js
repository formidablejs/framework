const $1 = Symbol.for('#__init__'), $2 = Symbol.for('#__patch__'), $6 = Symbol.for('#__initor__'), $7 = Symbol.for('#__inited__'), $3 = Symbol.for('#__hooks__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
class JsonResponse {
	[$2]($$ = {}){
		var $4;
		($4 = $$.data) !== undefined && (this.data = $4);
		($4 = $$.statusCode) !== undefined && (this.statusCode = $4);
		
	}
	[$1]($$ = null,deep = true){
		var $5;
		this.data = ($$ && ($5 = $$.data) !== undefined) ? ($5) : {};
		this.statusCode = ($$ && ($5 = $$.statusCode) !== undefined) ? ($5) : 200;
		
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
