function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('./Language'/*$path$*/));
var $2 = requireDefault$__(require('./LanguageServiceResolver'/*$path$*/));

exports.Language = $1.default;
exports.LanguageServiceResolver = $2.default;
