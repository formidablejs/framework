function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('@fastify/session'/*$path$*/));
var $2 = requireDefault$__(require('./DriverManager'/*$path$*/));
var $3 = requireDefault$__(require('../../Support/ServiceResolver'/*$path$*/));
var $4 = requireDefault$__(require('memorystore'/*$path$*/));

class SessionMemoryStoreServiceResolver extends $3.default {
	
	
	boot(){
		
		if (this.app.config.get('session.driver') == 'memory') {
			
			const store = $4.default($1.default);
			
			$2.default.register('memory',new store({
				checkPeriod: 86400000
			}));
			
			return this.app.addHook('onClose',function() {
				
				if ($2.default.isRegistered('memory')) { return $2.default.get('memory').stopInterval() };
			});
		};
	}
};
exports.default = SessionMemoryStoreServiceResolver;
