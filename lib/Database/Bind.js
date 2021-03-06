function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const $__init__$ = Symbol.for('#__init__'), $__patch__$ = Symbol.for('#__patch__'), $__initor__$ = Symbol.for('#__initor__'), $__inited__$ = Symbol.for('#__inited__'), $__hooks__$ = Symbol.for('#__hooks__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('../Support/Helpers/isEmpty'/*$path$*/));
var $2 = requireDefault$__(require('./Database'/*$path$*/));
class Bind {
	[$__patch__$]($$ = {}){
		var $3;
		($3 = $$.table) !== undefined && (this.table = $3);
		($3 = $$.first) !== undefined && (this.first = $3);
		
	}
	[$__init__$]($$ = null,deep = true){
		this.table = $$ ? $$.table : undefined;
		this.first = $$ ? $$.first : undefined;
		
	}
	/**
	@param {String} table
	@param {Boolean} first
	*/
	constructor(table,first = false){
		this[$__init__$]();
		this.table = table;
		this.first = first;
	}
	
	/**
	@param {Request} request
	@param {Number} key
	*/
	handle(request,key){
		
		const param = Object.keys(request.request.params)[key];
		
		const value = Object.values(request.request.params)[key];
		const column = (param.split(':')[1] != null) ? param.split(':')[1] : 'id';
		
		const query = $2.default.table(this.table).where(column,value);
		
		return this.first ? query.first() : query;
	}
};
exports.default = Bind;
