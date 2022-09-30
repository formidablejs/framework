function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('./EmailVerificationController'/*$path$*/));
var $2 = requireDefault$__(require('./LoginController'/*$path$*/));
var $3 = requireDefault$__(require('./LogoutController'/*$path$*/));
var $4 = requireDefault$__(require('./PasswordController'/*$path$*/));
var $5 = requireDefault$__(require('./RegisterController'/*$path$*/));

exports.EmailVerificationController = $1.default;
exports.LoginController = $2.default;
exports.LogoutController = $3.default;
exports.PasswordController = $4.default;
exports.RegisterController = $5.default;
