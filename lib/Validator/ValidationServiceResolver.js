function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('../Support/ServiceResolver'/*$path$*/));
var $2 = requireDefault$__(require('./Validator'/*$path$*/));

class ValidationServiceResolver extends $1.default {
	
	
	boot(){
		
		const rules = this.registeredRules();
		
		return this.registerRules(rules);
	}
	
	register(){
		
		return $2.default.get().register('nullable',this.nullable,'');
	}
	
	nullable(){
		
		return true;
	}
	
	registeredRules(){
		
		return {};
	}
	
	/**
	@param {object} rules
	*/
	registerRules(rules){
		
		Object.keys(rules).forEach(function(name) {
			
			return $2.default.get().registerAsync(name,rules[name].handler);
		});
		
		return this;
	}
};
exports.default = ValidationServiceResolver;
