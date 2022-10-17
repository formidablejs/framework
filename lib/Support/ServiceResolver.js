function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const $__init__$ = Symbol.for('#__init__'), $__patch__$ = Symbol.for('#__patch__'), $__initor__$ = Symbol.for('#__initor__'), $__inited__$ = Symbol.for('#__inited__'), $__hooks__$ = Symbol.for('#__hooks__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('../Foundation/Application'/*$path$*/));

class ServiceResolver {
	[$__patch__$]($$ = {}){
		var $2;
		($2 = $$.app) !== undefined && (this.app = $2);
		
	}
	[$__init__$]($$ = null,deep = true){
		this.app = $$ ? $$.app : undefined;
		
	}
	get context(){
		
		return [];
	}
	
	/**
	@param {Application} app
	*/
	constructor(app){
		this[$__init__$]();
		this.app = app;
	}
	
	boot(){
		
		return null;
	}
	
	register(){
		
		return null;
	}
};
exports.default = ServiceResolver;
