
const Response = require('../../Http/Response/Response'/*$path$*/);

module.exports = /**
@param {any} data
@param {number} statusCode
*/
function response(data = null,statusCode = 200){
	
	return new Response(data,statusCode);
};
