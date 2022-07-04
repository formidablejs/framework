function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('./Redis'/*$path$*/));
var $2 = requireDefault$__(require('../Support/ServiceResolver'/*$path$*/));
var $3 = requireDefault$__(require('@fastify/session'/*$path$*/));
var $4 = requireDefault$__(require('../Http/Session/DriverManager'/*$path$*/));
var $5 = requireDefault$__(require('connect-redis'/*$path$*/));

class RedisServiceResolver extends $2.default {
	
	
	boot(){
		
		// configure redis.
		$1.default.configure(this.app.config);
		
		if (this.app.config.get('session.driver') == 'redis') {
			
			const store = $5.default($3.default);
			const client = $1.default.connection('default');
			
			// register redis store driver.
			$4.default.register('redis',new store({
				client: client
			}));
		};
		
		// close redis connections.
		return this.app.addHook('onClose',function() { return $1.default.closeAll(); });
	}
};
exports.default = RedisServiceResolver;
