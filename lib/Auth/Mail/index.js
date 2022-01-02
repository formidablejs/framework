function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$ResetPasswordφ = requireDefault$__(require('./ResetPassword'/*$path$*/));
var _$VerifyEmailφ = requireDefault$__(require('./VerifyEmail'/*$path$*/));

exports.ResetPassword = _$ResetPasswordφ.default;
exports.VerifyEmail = _$VerifyEmailφ.default;
