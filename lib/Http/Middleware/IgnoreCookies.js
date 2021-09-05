
module.exports = class IgnoreCookies {
	
	
	handle(request,reply){
		
		return reply.setCookie = function() { return null; };
	}
};
