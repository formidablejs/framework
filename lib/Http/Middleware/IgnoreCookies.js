Object.defineProperty(exports, "__esModule", {value: true});

/*body*/

class IgnoreCookies {
	
	
	/**
	@param {FormRequest} request
	@param {FastifyReply} reply
	@param {any[]|null} params
	*/
	handle(request,reply,params){
		
		return reply.setCookie = function() { return null; };
	}
};
exports.default = IgnoreCookies;
