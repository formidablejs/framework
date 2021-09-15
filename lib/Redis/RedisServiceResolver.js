function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$Redisφ = requireDefault$__(require('./Redis'/*$path$*/));
var _$ServiceResolverφ = requireDefault$__(require('../Support/ServiceResolver'/*$path$*/));
var _$sessionφ = requireDefault$__(require('@fastify/session'/*$path$*/));
var _$DriverManagerφ = requireDefault$__(require('../Http/Session/DriverManager'/*$path$*/));
var _$connect_redisφ = requireDefault$__(require('connect-redis'/*$path$*/));

class RedisServiceResolver extends _$ServiceResolverφ.default {
	
	
	boot(){
		
		// configure redis.
		_$Redisφ.default.configure(this.app.config);
		
		if (this.app.config.get('session.driver') == 'redis') {
			
			const store = _$connect_redisφ.default(_$sessionφ.default);
			
			// register redis store driver.
			_$DriverManagerφ.default.register('redis',new store({
				client: _$Redisφ.default.connection('default')
			}));
		};
		
		// close redis connections.
		return this.app.addHook('onClose',function() { return _$Redisφ.default.closeAll(); });
	}
};
exports.default = RedisServiceResolver;
