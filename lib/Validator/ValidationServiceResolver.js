
const ServiceResolver = require('../Support/ServiceResolver'/*$path$*/);
const Validator = require('./Validator'/*$path$*/);

module.exports = class ValidationServiceResolver extends ServiceResolver {
	
	
	boot(){
		
		const rules = this.registeredRules();
		
		return this.registerRules(rules);
	}
	
	registeredRules(){
		
		return {};
	}
	
	/**
	@param {Object} rules
	*/
	registerRules(rules){
		
		Object.keys(rules).forEach(function(name) {
			
			return Validator.get().registerAsync(name,rules[name].handler);
		});
		
		return this;
	}
};
