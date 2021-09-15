const Ψ__init__ = Symbol.for('#__init__'), Ψ__initor__ = Symbol.for('#__initor__'), Ψ__inited__ = Symbol.for('#__inited__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
class JsonResponse {
	[Ψ__init__]($$ = null){
		var vφ;
		this.data = ($$ && (vφ = $$.data) !== undefined) ? (vφ) : {};
		this.statusCode = ($$ && (vφ = $$.statusCode) !== undefined) ? (vφ) : 200;
		
	}
	/**
	@param {Object} object
	*/
	constructor(object){
		this[Ψ__init__]();
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
