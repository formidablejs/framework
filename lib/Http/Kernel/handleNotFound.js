function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$NotFoundExceptionφ = requireDefault$__(require('../Exceptions/NotFoundException'/*$path$*/));

function handleNotFound(request){
	
	return new _$NotFoundExceptionφ.default(("Route " + (request.method) + ":" + (request.url) + " not found."));
};
exports.default = handleNotFound;
