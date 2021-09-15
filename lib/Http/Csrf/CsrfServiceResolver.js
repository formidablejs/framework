function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$Routeφ = requireDefault$__(require('../Router/Route'/*$path$*/));
var _$ServiceResolverφ = requireDefault$__(require('../../Support/ServiceResolver'/*$path$*/));

class CsrfServiceResolver extends _$ServiceResolverφ.default {
	
	
	boot(){
		
		return _$Routeφ.default.get('csrf-cookie',function(request,reply) {
			
			reply.code(204);
			
			return '';
		}).middleware('session');
	}
};
exports.default = CsrfServiceResolver;
