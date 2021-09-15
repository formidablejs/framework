function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$sessionφ = requireDefault$__(require('@fastify/session'/*$path$*/));
var _$DriverManagerφ = requireDefault$__(require('./DriverManager'/*$path$*/));
var _$ServiceResolverφ = requireDefault$__(require('../../Support/ServiceResolver'/*$path$*/));
var _$session_file_storeφ = requireDefault$__(require('session-file-store'/*$path$*/));

class SessionFileStoreServiceResolver extends _$ServiceResolverφ.default {
	
	
	boot(){
		
		if (this.app.config.get('session.driver') === 'file') {
			
			const store = _$session_file_storeφ.default(_$sessionφ.default);
			
			return _$DriverManagerφ.default.register('file',new store({
				path: 'storage/sessions'
			}));
		};
	}
};
exports.default = SessionFileStoreServiceResolver;
