function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('./Path'/*$path$*/));
var $2 = requireDefault$__(require('./Route'/*$path$*/));

exports.Path = $1.default;
exports.Route = $2.default;
