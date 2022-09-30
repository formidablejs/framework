function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('./MissingRouteParamException'/*$path$*/));
var $2 = requireDefault$__(require('./UnregisteredRouteException'/*$path$*/));

exports.MissingRouteParamException = $1.default;
exports.UnregisteredRouteException = $2.default;
