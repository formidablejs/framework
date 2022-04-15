function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const $3 = Symbol.for('#__init__'), $4 = Symbol.for('#__patch__'), $8 = Symbol.for('#__initor__'), $9 = Symbol.for('#__inited__'), $5 = Symbol.for('#__hooks__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/

var $1 = requireDefault$__(require('./JsonResponse'/*$path$*/));
var $2 = requireDefault$__(require('./ViewResponse'/*$path$*/));

class Response {
	[$4]($$ = {}){
		var $6;
		($6 = $$.data) !== undefined && (this.data = $6);
		($6 = $$.statusCode) !== undefined && (this.statusCode = $6);
		
	}
	[$3]($$ = null){
		var $7;
		this.data = ($$ && ($7 = $$.data) !== undefined) ? ($7) : null;
		this.statusCode = ($$ && ($7 = $$.statusCode) !== undefined) ? ($7) : 200;
		
	}
	/**
	@param {any} data
	@param {Number} statusCode
	*/
	constructor(data = null,statusCode = 200){
		this[$3]();
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
