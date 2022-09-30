function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('./HigherOrderTapProxy'/*$path$*/);
var $2 = require('./InfiniteHigherOrderTapProxy'/*$path$*/);
var $3 = requireDefault$__(require('./ServiceResolver'/*$path$*/));

exports.HigherOrderTapProxy = $1.HigherOrderTapProxy;
exports.InfiniteHigherOrderTapProxy = $2.InfiniteHigherOrderTapProxy;
exports.ServiceResolver = $3.default;
