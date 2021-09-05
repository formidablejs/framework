
const Route = require('../Router/Manager'/*$path$*/);
const ServiceResolver = require('../../Support/ServiceResolver'/*$path$*/);

module.exports = class CsrfServiceResolver extends ServiceResolver {
	
	
	boot(){
		
		return Route.get('csrf-cookie',function(request,reply) {
			
			reply.code(204);
			
			return '';
		}).middleware('session');
	}
};
