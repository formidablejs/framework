Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
class IgnoreCookies {
	
	
	handle(request,reply){
		
		return reply.setCookie = function() { return null; };
	}
};
exports.default = IgnoreCookies;
