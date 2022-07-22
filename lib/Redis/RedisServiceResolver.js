function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('redis'/*$path$*/);
var $2 = requireDefault$__(require('./Redis'/*$path$*/));
var $3 = requireDefault$__(require('../Support/ServiceResolver'/*$path$*/));
var $4 = requireDefault$__(require('@fastify/session'/*$path$*/));
var $5 = requireDefault$__(require('../Http/Session/DriverManager'/*$path$*/));
var $6 = requireDefault$__(require('connect-redis'/*$path$*/));

class RedisServiceResolver extends $3.default {
	
	
	get connection(){
		
		const connection = this.app.config.get('database.redis.default');
		const options = this.app.config.get('database.redis.options');
		
		return Object.assign(connection,options);
	}
	
	redis(){
		
		let redisClient = $1.createClient(Object.assign({legacyMode: true},this.connection));
		redisClient.connect().catch(console.error);
		
		return redisClient;
	}
	
	boot(){
		
		// configure redis.
		$2.default.configure(this.app.config);
		
		let sessionClient;;
		
		if (this.app.config.get('session.driver') == 'redis') {
			
			if (process.argv && process.argv[1] && process.argv[1].substr(-10) !== 'console.js') {
				
				sessionClient = this.redis();
				
				const store = $6.default($4.default);
				
				$5.default.register('redis',new store({
					client: sessionClient
				}));
			} else {
				
				$5.default.register('redis',function() {  });
			};
		};
		
		// close redis connections.
		return this.app.addHook('onClose',function() {
			
			if (sessionClient) { sessionClient.quit() };
			
			return $2.default.closeAll();
		});
	}
};
exports.default = RedisServiceResolver;
