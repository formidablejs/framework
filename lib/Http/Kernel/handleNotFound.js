function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/

var $1 = requireDefault$__(require('../Exceptions/NotFoundException'/*$path$*/));

/**
@param {FormRequest} request
*/
function handleNotFound(request){
	
	return new $1.default(("Route " + request.method() + ":" + request.url() + " not found."));
};
exports.default = handleNotFound;
