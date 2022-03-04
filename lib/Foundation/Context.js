function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('../Support/Helpers/isString'/*$path$*/));
var $2 = requireDefault$__(require('../Support/Helpers/isEmpty'/*$path$*/));
var $3 = requireDefault$__(require('../Support/Helpers/isClass'/*$path$*/));

const registered = {};

class ContextAPI {
	
	
	get registered(){
		
		return registered;
	}
	
	inject(target){
		
		if (!($3.default(target))) {
			
			throw new TypeError('Target must be a valid class.');
		};
		
		if ($2.default(target.context || (target.context && !($1.default(target.context))))) {
			
			throw new TypeError("Missing context name.");
		};
		
		if (registered[target.context]) {
			
			throw new Error(("Target \"" + (target.context) + "\" already registered."));
		};
		
		registered[target.context] = target;
		
		return this;
	}
};

let Context = new ContextAPI;

exports.ContextAPI = ContextAPI;
exports.Context = Context;
