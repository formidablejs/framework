
const {Mailable: Mailable} = require('@formidablejs/mailer'/*$path$*/);
const JsonResponse = require('../Response/JsonResponse'/*$path$*/);
const Redirect = require('../Redirect/Redirect'/*$path$*/);
const Response = require('../Response/Response'/*$path$*/);

module.exports = /**
@param {any} response
*/
async function resolveResponse(response,reply){
	
	if (response instanceof Redirect) { return reply.code(response.statusCode).redirect(response.path) };
	
	if (response instanceof JsonResponse) { return response.toJson(reply) };
	
	if ((response instanceof Mailable)) {
		
		reply.header('content-type','text/html');
		
		return response.render() ? String(await response.render()) : '';
	};
	
	if (response instanceof Response) {
		
		reply.code(response.statusCode);
		
		if (response.data) { return response.data };;
		
		return '';
	};
	
	if (response === undefined) { return null };
	
	return response;
};
