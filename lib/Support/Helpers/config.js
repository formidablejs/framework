function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
// import Application from '../../Foundation/Application'
var _$ConfigNotCachedErrorφ = requireDefault$__(require('./Error/ConfigNotCachedError'/*$path$*/));
var _$Repositoryφ = requireDefault$__(require('../../Config/Repository'/*$path$*/));
var _$dotNotationφ = requireDefault$__(require('./dotNotation'/*$path$*/));
var _$pathφ = requireDefault$__(require('path'/*$path$*/));

// def fallback notation\String, default\any = null
// 	try Application.getConfig(notation, default)
// 	catch
// 		throw new ConfigNotCachedError

/**
@param {string} notation
@param {string} default
*/
function config(notation,default$ = null){
	var φ;
	
	const location = _$pathφ.default.join(process.cwd(),'bootstrap','cache','config.json');
	
	try {
		
		const config = require(location);
		
		return ((φ = _$dotNotationφ.default(config,notation)) != null) ? (φ) : default$;
	} catch (e) {
		
		throw new _$ConfigNotCachedErrorφ.default;
	};
};
exports.default = config;
