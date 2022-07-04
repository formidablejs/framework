function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const $__init__$ = Symbol.for('#__init__'), $__patch__$ = Symbol.for('#__patch__'), $__initor__$ = Symbol.for('#__initor__'), $__inited__$ = Symbol.for('#__inited__'), $__hooks__$ = Symbol.for('#__hooks__');
var $2 = Symbol();
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('../../Http/Exceptions/HttpException'/*$path$*/));

class MaintenanceModeException extends $1.default {
	static [$__init__$](){
		this.prototype[$__initor__$] = $2;
		return this;
	}
	[$__patch__$]($$ = {}){
		var $3;
		super[$__patch__$] && super[$__patch__$]($$);
		($3 = $$.response) !== undefined && (this.response = $3);
		($3 = $$.status) !== undefined && (this.status = $3);
		
	}
	constructor(){
		super(...arguments);
		super[$__init__$] || this[$__init__$]();this[$__initor__$]===$2 && (this[$__hooks__$]&&this[$__hooks__$].inited(this),this[$__inited__$] && this[$__inited__$]());
	}
	[$__init__$]($$ = null,deep = true){
		var $4;
		deep && super[$__init__$] && super[$__init__$](...arguments);
		this.response = ($$ && ($4 = $$.response) !== undefined) ? ($4) : 'Service Unavailable';
		this.status = ($$ && ($4 = $$.status) !== undefined) ? ($4) : 503;
		
	}
};
exports.default = MaintenanceModeException; MaintenanceModeException[$__init__$]();
