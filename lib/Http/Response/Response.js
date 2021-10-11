function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const Ψ__init__ = Symbol.for('#__init__'), Ψ__initor__ = Symbol.for('#__initor__'), Ψ__inited__ = Symbol.for('#__inited__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/

var _$JsonResponseφ = requireDefault$__(require('./JsonResponse'/*$path$*/));
var _$ViewResponseφ = requireDefault$__(require('./ViewResponse'/*$path$*/));

class Response {
	[Ψ__init__]($$ = null){
		var vφ;
		this.data = ($$ && (vφ = $$.data) !== undefined) ? (vφ) : null;
		this.statusCode = ($$ && (vφ = $$.statusCode) !== undefined) ? (vφ) : 200;
		
	}
	/**
	@param {any} data
	@param {Number} statusCode
	*/
	constructor(data = null,statusCode = 200){
		this[Ψ__init__]();
		this.data = data;
		this.statusCode = statusCode;
	}
	
	/**
	@param {Object} object
	*/
	json(object){
		
		return _$JsonResponseφ.default.make(object);
	}
	
	/**
	@param {View} view
	@param {Object|null} data
	*/
	view(view,data = null){
		
		return _$ViewResponseφ.default.make(view,data);
	}
	
	/**
	@param {Number} statusCode
	*/
	code(statusCode){
		
		return this.statusCode = statusCode;
	}
};
exports.default = Response;
