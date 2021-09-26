function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$ConfigNotCachedErrorφ = requireDefault$__(require('./Error/ConfigNotCachedError'/*$path$*/));
var _$dotNotationφ = requireDefault$__(require('./dotNotation'/*$path$*/));
var _$pathφ = requireDefault$__(require('path'/*$path$*/));

/**
@param {String} notation
@param {any} default
*/
function fallback(notation,default$ = null){
	
	try {
		
		const app = require('../../Foundation/Application'/*$path$*/).default;
		
		return app.getConfig(notation,default$);
	} catch (e) {
		
		throw new _$ConfigNotCachedErrorφ.default;
	};
};

/**
@param {String} notation
@param {any} default
*/
function config(notation,default$ = null){
	var φ;
	
	try {
		
		const config = require(_$pathφ.default.join(process.cwd(),'bootstrap','cache','config.json'));
		
		return ((φ = _$dotNotationφ.default(config,notation)) != null) ? (φ) : default$;
	} catch (e) {
		
		return fallback(notation,default$);
	};
};
exports.default = config;
