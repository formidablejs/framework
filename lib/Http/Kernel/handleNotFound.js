
const NotFoundException = require('../Exceptions/NotFoundException'/*$path$*/);

module.exports = function handleNotFound(request){
	
	return new NotFoundException(("Route " + (request.method) + ":" + (request.url) + " not found."));
};
