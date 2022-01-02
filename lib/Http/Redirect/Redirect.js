function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const Ψ__init__ = Symbol.for('#__init__'), Ψ__initor__ = Symbol.for('#__initor__'), Ψ__inited__ = Symbol.for('#__inited__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$indexφ = require('../../Support/Helpers/index'/*$path$*/);
var _$URLφ = requireDefault$__(require('../URL/URL'/*$path$*/));

class Redirect {
	[Ψ__init__]($$ = null){
		var vφ;
		this.path = $$ ? $$.path : undefined;
		this.statusCode = $$ ? $$.statusCode : undefined;
		this._flashed = ($$ && (vφ = $$._flashed) !== undefined) ? (vφ) : {};
		
	}
	/**
	@param {String} path
	@param {Number} statusCode
	*/
	constructor(path,statusCode = 302){
		this[Ψ__init__]();
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
		
		return new this(_$URLφ.default.route(name,params));
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
		
		return !(_$indexφ.isEmpty(this._flashed));
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
		
		if (_$indexφ.isEmpty(this.path)) { this.path = request.header('referer') };
		
		if (this.hasFlash()) { request.flashMany(this.flashed()) };
		
		return reply.code(this.statusCode).redirect(this.path);
	}
};
exports.default = Redirect;
