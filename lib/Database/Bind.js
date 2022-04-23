function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const $3 = Symbol.for('#__init__'), $4 = Symbol.for('#__patch__'), $7 = Symbol.for('#__initor__'), $8 = Symbol.for('#__inited__'), $5 = Symbol.for('#__hooks__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('../Support/Helpers/isEmpty'/*$path$*/));
var $2 = requireDefault$__(require('./Database'/*$path$*/));
class Bind {
	[$4]($$ = {}){
		var $6;
		($6 = $$.table) !== undefined && (this.table = $6);
		($6 = $$.first) !== undefined && (this.first = $6);
		
	}
	[$3]($$ = null){
		this.table = $$ ? $$.table : undefined;
		this.first = $$ ? $$.first : undefined;
		
	}
	/**
	@param {String} table
	@param {Boolean} first
	*/
	constructor(table,first = false){
		this[$3]();
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
