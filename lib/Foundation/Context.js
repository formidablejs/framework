function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$isStringφ = requireDefault$__(require('../Support/Helpers/isString'/*$path$*/));
var _$isEmptyφ = requireDefault$__(require('../Support/Helpers/isEmpty'/*$path$*/));
var _$isClassφ = requireDefault$__(require('../Support/Helpers/isClass'/*$path$*/));

const registered = {};

class ContextAPI {
	
	
	get registered(){
		
		return registered;
	}
	
	inject(target){
		
		if (!(_$isClassφ.default(target))) {
			
			throw new TypeError('Target must be a valid class.');
		};
		
		if (_$isEmptyφ.default(target.context || (target.context && !(_$isStringφ.default(target.context))))) {
			
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
