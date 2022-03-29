function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const $2 = Symbol.for('#__init__'), $3 = Symbol.for('#__patch__'), $6 = Symbol.for('#__initor__'), $7 = Symbol.for('#__inited__'), $4 = Symbol.for('#__hooks__');
var $5 = Symbol();
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('../../../Http/Request/FormRequest'/*$path$*/));
class RegisterRequest extends $1.default {
	static [$2](){
		this.prototype[$6] = $5;
		return this;
	}
	[$3]($$ = {}){
		var $8;
		super[$3] && super[$3]($$);
		($8 = $$.authDriver) !== undefined && (this.authDriver = $8);
		
	}
	constructor(){
		super(...arguments);
		super[$2] || this[$2]();this[$6]===$5 && (this[$4]&&this[$4].inited(this),this[$7] && this[$7]());
	}
	[$2]($$ = null){
		super[$2] && super[$2](...arguments);
		this.authDriver = $$ ? $$.authDriver : undefined;
		
	}
	authorize(){
		
		return true;
	}
	
	rules(){
		
		return {
			name: 'required',
			email: 'required|email',
			password: 'required|min:8|confirmed',
			password_confirmation: 'required'
		};
	}
	
	async persist(){
		
		return await this.authDriver.register(this.body());
	}
};
exports.default = RegisterRequest; RegisterRequest[$2]();
