function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$sessionφ = requireDefault$__(require('@fastify/session'/*$path$*/));
var _$DriverManagerφ = requireDefault$__(require('./DriverManager'/*$path$*/));
var _$ServiceResolverφ = requireDefault$__(require('../../Support/ServiceResolver'/*$path$*/));
var _$memorystoreφ = requireDefault$__(require('memorystore'/*$path$*/));

class SessionMemoryStoreServiceResolver extends _$ServiceResolverφ.default {
	
	
	boot(){
		
		if (this.app.config.get('session.driver') == 'memory') {
			
			const store = _$memorystoreφ.default(_$sessionφ.default);
			
			_$DriverManagerφ.default.register('memory',new store({
				checkPeriod: 86400000
			}));
			
			return this.app.addHook('onClose',function() {
				
				if (_$DriverManagerφ.default.isRegistered('memory')) { return _$DriverManagerφ.default.get('memory').stopInterval() };
			});
		};
	}
};
exports.default = SessionMemoryStoreServiceResolver;
