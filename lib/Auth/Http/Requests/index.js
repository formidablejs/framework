function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('./EmailResendRequest'/*$path$*/));
var $2 = requireDefault$__(require('./ForgotPasswordRequest'/*$path$*/));
var $3 = requireDefault$__(require('./LoginRequest'/*$path$*/));
var $4 = requireDefault$__(require('./LogoutRequest'/*$path$*/));
var $5 = requireDefault$__(require('./RegisterRequest'/*$path$*/));
var $6 = requireDefault$__(require('./ResetPasswordRequest'/*$path$*/));
var $7 = requireDefault$__(require('./VerifyEmailRequest'/*$path$*/));

exports.EmailResendRequest = $1.default;
exports.ForgotPasswordRequest = $2.default;
exports.LoginRequest = $3.default;
exports.LogoutRequest = $4.default;
exports.RegisterRequest = $5.default;
exports.ResetPasswordRequest = $6.default;
exports.VerifyEmailRequest = $7.default;
