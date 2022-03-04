function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('@fastify/session'/*$path$*/));
var $2 = requireDefault$__(require('./DriverManager'/*$path$*/));
var $3 = requireDefault$__(require('../../Support/ServiceResolver'/*$path$*/));
var $4 = requireDefault$__(require('session-file-store'/*$path$*/));

class SessionFileStoreServiceResolver extends $3.default {
	
	
	boot(){
		
		if (this.app.config.get('session.driver') === 'file') {
			
			const store = $4.default($1.default);
			
			return $2.default.register('file',new store({
				path: 'storage/sessions'
			}));
		};
	}
};
exports.default = SessionFileStoreServiceResolver;
