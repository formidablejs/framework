function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const $3 = Symbol.for('#__init__'), $6 = Symbol.for('#__initor__'), $7 = Symbol.for('#__inited__'), $4 = Symbol.for('#__hooks__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('../../Support/Helpers/index'/*$path$*/);
var $2 = requireDefault$__(require('../URL/URL'/*$path$*/));

class Redirect {
	[$3]($$ = null){
		var $5;
		this.path = $$ ? $$.path : undefined;
		this.statusCode = $$ ? $$.statusCode : undefined;
		this._flashed = ($$ && ($5 = $$._flashed) !== undefined) ? ($5) : {};
		
	}
	/**
	@param {String} path
	@param {Number} statusCode
	*/
	constructor(path,statusCode = 302){
		this[$3]();
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
	@param {Number|null} statucCode
	*/
	static back(statucCode = 302){
		
		return new this(null,statucCode);
	}
	
	/**
	@param {String} name
	@param {Object} params
	*/
	static route(name,params = {}){
		
		return new this($2.default.route(name,params));
	}
	
	/**
	@param {String} key
	@param {any} value
	*/
	with(key,value){
		
		this._flashed = Object.assign(this._flashed,{
			[key]: value
		});
		
		return this;
	}
	
	hasFlash(){
		
		return !($1.isEmpty(this._flashed));
	}
	
	flashed(){
		
		return this._flashed;
	}
	
	/**
	@param {Number} statusCode
	*/
	code(statusCode){
		
		this.statusCode = statusCode;
		
		return this;
	}
	
	handle(request,reply){
		
		if ($1.isEmpty(this.path)) { this.path = request.header('referer') };
		
		if (this.hasFlash()) { request.flashMany(this.flashed()) };
		
		return reply.code(this.statusCode).redirect(this.path);
	}
};
exports.default = Redirect;
