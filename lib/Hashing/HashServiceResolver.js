function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('../Support/ServiceResolver'/*$path$*/));
var $2 = requireDefault$__(require('./Hash'/*$path$*/));

class HashServiceResolver extends $1.default {
	
	
	boot(){
		
		return $2.default.configure(this.app.config.get('hashing'));
	}
};
exports.default = HashServiceResolver;
