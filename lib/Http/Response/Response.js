function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const $__init__$ = Symbol.for('#__init__'), $__patch__$ = Symbol.for('#__patch__'), $__initor__$ = Symbol.for('#__initor__'), $__inited__$ = Symbol.for('#__inited__'), $__hooks__$ = Symbol.for('#__hooks__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/

var $1 = requireDefault$__(require('./JsonResponse'/*$path$*/));
var $2 = requireDefault$__(require('./ViewResponse'/*$path$*/));

class Response {
	[$__patch__$]($$ = {}){
		var $3;
		($3 = $$.data) !== undefined && (this.data = $3);
		($3 = $$.statusCode) !== undefined && (this.statusCode = $3);
		
	}
	[$__init__$]($$ = null,deep = true){
		var $4;
		this.data = ($$ && ($4 = $$.data) !== undefined) ? ($4) : null;
		this.statusCode = ($$ && ($4 = $$.statusCode) !== undefined) ? ($4) : 200;
		
	}
	/**
	@param {any} data
	@param {Number} statusCode
	*/
	constructor(data = null,statusCode = 200){
		this[$__init__$]();
		this.data = data;
		this.statusCode = statusCode;
	}
	
	/**
	@param {Object} object
	*/
	json(object){
		
		return $1.default.make(object);
	}
	
	/**
	@param {View} view
	@param {Object|null} data
	*/
	view(view,data = null){
		
		return $2.default.make(view,data);
	}
	
	/**
	@param {Number} statusCode
	*/
	code(statusCode){
		
		return this.statusCode = statusCode;
	}
};
exports.default = Response;
