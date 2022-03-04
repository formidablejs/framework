function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('./ResetPassword'/*$path$*/));
var $2 = requireDefault$__(require('./VerifyEmail'/*$path$*/));

exports.ResetPassword = $1.default;
exports.VerifyEmail = $2.default;
