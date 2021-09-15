function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const Ψ__initor__ = Symbol.for('#__initor__'), Ψ__inited__ = Symbol.for('#__inited__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$URLφ = requireDefault$__(require('../URL/URL'/*$path$*/));

class Redirect {
	
	
	/**
	@param {String} path
	@param {Number} statusCode
	*/
	constructor(path,statusCode = 302){
		
		this.path = path;
		this.statusCode = statusCode;
	}
	
	/**
	@param {String} path
	*/
	static to(path){
		
		return new this(path);
	}
	
	/**
	@param {String} name
	@param {Object} params
	*/
	static route(name,params = {}){
		
		return new this(_$URLφ.default.route(name,params));
	}
	
	/**
	@param {Number} statusCode
	*/
	code(statusCode){
		
		this.statusCode = statusCode;
		
		return this;
	}
};
exports.default = Redirect;
