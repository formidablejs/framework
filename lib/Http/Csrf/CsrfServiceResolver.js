function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('../Router/Route'/*$path$*/));
var $2 = requireDefault$__(require('../../Support/ServiceResolver'/*$path$*/));

class CsrfServiceResolver extends $2.default {
	
	
	boot(){
		
		return $1.default.get('csrf-cookie',function(request,reply) {
			
			reply.code(204);
			
			return '';
		}).middleware('session');
	}
};
exports.default = CsrfServiceResolver;
