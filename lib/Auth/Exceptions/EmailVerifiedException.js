function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const $2 = Symbol.for('#__init__'), $5 = Symbol.for('#__initor__'), $6 = Symbol.for('#__inited__'), $3 = Symbol.for('#__hooks__');
var $4 = Symbol();
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('../../Http/Exceptions/HttpException'/*$path$*/));

class EmailVerifiedException extends $1.default {
	static [$2](){
		this.prototype[$5] = $4;
		return this;
	}
	constructor(){
		super(...arguments);
		super[$2] || this[$2]();this[$5]===$4 && (this[$3]&&this[$3].inited(this),this[$6] && this[$6]());
	}
	[$2]($$ = null){
		var $7;
		super[$2] && super[$2](...arguments);
		this.status = ($$ && ($7 = $$.status) !== undefined) ? ($7) : 403;
		
	}
}; EmailVerifiedException[$2]();

exports.default = EmailVerifiedException;
