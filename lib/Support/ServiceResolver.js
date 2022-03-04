function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const $2 = Symbol.for('#__init__'), $4 = Symbol.for('#__initor__'), $5 = Symbol.for('#__inited__'), $3 = Symbol.for('#__hooks__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('../Foundation/Application'/*$path$*/));

class ServiceResolver {
	[$2]($$ = null){
		this.app = $$ ? $$.app : undefined;
		
	}
	/**
	@param {Application} app
	*/
	constructor(app){
		this[$2]();
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
