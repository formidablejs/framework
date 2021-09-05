
const Redis = require('./Redis'/*$path$*/);
const ServiceResolver = require('../Support/ServiceResolver'/*$path$*/);
const session = require('@fastify/session'/*$path$*/);
const SessionDriverManager = require('../Http/Session/DriverManager'/*$path$*/);

module.exports = class RedisServiceResolver extends ServiceResolver {
	
	
	boot(){
		
		// configure redis.
		Redis.configure(this.app.config);
		
		if (this.app.config.get('session.driver') == 'redis') {
			
			const redisStore = require('connect-redis'/*$path$*/)(session);
			
			// register redis store driver.
			SessionDriverManager.register('redis',new redisStore({
				client: Redis.connection('default')
			}));
		};
		
		// close redis connections.
		return this.app.addHook('onClose',function() { return Redis.closeAll(); });
	}
};
