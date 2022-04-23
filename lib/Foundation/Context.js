function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('@formidablejs/mailer'/*$path$*/);
var $2 = requireDefault$__(require('../Database/Database'/*$path$*/));
var $3 = requireDefault$__(require('../Support/Helpers/isClass'/*$path$*/));
var $4 = requireDefault$__(require('../Support/Helpers/isEmpty'/*$path$*/));
var $5 = requireDefault$__(require('../Support/Helpers/isString'/*$path$*/));

const registered = {
	Database: $2.default,
	DB: $2.default,
	Mail: $1.Mail
};

class ContextAPI {
	
	
	get registered(){
		
		return registered;
	}
	
	inject(target){
		
		if (!($3.default(target))) {
			
			throw new TypeError('Target must be a valid class.');
		};
		
		if ($4.default(target.context || (target.context && !($5.default(target.context))))) {
			
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
