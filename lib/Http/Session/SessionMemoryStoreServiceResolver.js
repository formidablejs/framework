
const session = require('@fastify/session'/*$path$*/);
const DriverManager = require('./DriverManager'/*$path$*/);
const ServiceResolver = require('../../Support/ServiceResolver'/*$path$*/);

module.exports = class SessionMemoryStoreServiceResolver extends ServiceResolver {
	
	
	boot(){
		
		if (this.app.config.get('session.driver') == 'memory') {
			
			const MemoryStore = require('memorystore'/*$path$*/)(session);
			
			DriverManager.register('memory',new MemoryStore({
				checkPeriod: 86400000
			}));
			
			return this.app.addHook('onClose',function() {
				
				if (DriverManager.isRegistered('memory')) { return DriverManager.get('memory').stopInterval() };
			});
		};
	}
};
