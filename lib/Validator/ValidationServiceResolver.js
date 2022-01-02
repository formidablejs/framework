function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$ServiceResolverφ = requireDefault$__(require('../Support/ServiceResolver'/*$path$*/));
var _$Validatorφ = requireDefault$__(require('./Validator'/*$path$*/));

class ValidationServiceResolver extends _$ServiceResolverφ.default {
	
	
	boot(){
		
		const rules = this.registeredRules();
		
		return this.registerRules(rules);
	}
	
	register(){
		
		return _$Validatorφ.default.get().register('nullable',this.nullable,'');
	}
	
	nullable(){
		
		return true;
	}
	
	registeredRules(){
		
		return {};
	}
	
	/**
	@param {Object} rules
	*/
	registerRules(rules){
		
		Object.keys(rules).forEach(function(name) {
			
			return _$Validatorφ.default.get().registerAsync(name,rules[name].handler);
		});
		
		return this;
	}
};
exports.default = ValidationServiceResolver;
