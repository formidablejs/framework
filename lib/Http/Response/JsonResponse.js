const $__init__$ = Symbol.for('#__init__'), $__patch__$ = Symbol.for('#__patch__'), $__initor__$ = Symbol.for('#__initor__'), $__inited__$ = Symbol.for('#__inited__'), $__hooks__$ = Symbol.for('#__hooks__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
class JsonResponse {
	[$__patch__$]($$ = {}){
		var $1;
		($1 = $$.data) !== undefined && (this.data = $1);
		($1 = $$.statusCode) !== undefined && (this.statusCode = $1);
		
	}
	[$__init__$]($$ = null,deep = true){
		var $2;
		this.data = ($$ && ($2 = $$.data) !== undefined) ? ($2) : {};
		this.statusCode = ($$ && ($2 = $$.statusCode) !== undefined) ? ($2) : 200;
		
	}
	/**
	@param {Object} object
	*/
	constructor(object){
		this[$__init__$]();
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
