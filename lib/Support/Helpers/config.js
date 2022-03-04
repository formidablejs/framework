function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('./Error/ConfigNotCachedError'/*$path$*/));
var $2 = requireDefault$__(require('./dotNotation'/*$path$*/));
var $3 = requireDefault$__(require('path'/*$path$*/));

/**
@param {String} notation
@param {any} default
*/
function fallback(notation,default$ = null){
	
	try {
		
		const app = require('../../Foundation/Application'/*$path$*/).default;
		
		return app.getConfig(notation,default$);
	} catch (e) {
		
		throw new $1.default;
	};
};

/**
@param {String} notation
@param {any} default
*/
function config(notation,default$ = null){
	var $4;
	
	try {
		
		const config = require($3.default.join(process.cwd(),'bootstrap','cache','config.json'));
		
		return (($4 = $2.default(config,notation)) != null) ? ($4) : default$;
	} catch (e) {
		
		return fallback(notation,default$);
	};
};
exports.default = config;
