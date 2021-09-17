function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$ConfigNotCachedErrorφ = requireDefault$__(require('./Error/ConfigNotCachedError'/*$path$*/));
var _$dotNotationφ = requireDefault$__(require('./dotNotation'/*$path$*/));
var _$envφ = requireDefault$__(require('./env'/*$path$*/));
var _$pathφ = requireDefault$__(require('path'/*$path$*/));

/**
@param {string} notation
@param {string} default
*/
function config(notation,default$ = null){
	var φ;
	
	const location = _$pathφ.default.join(_$envφ.default('PREFER_DISTRIBUTED_CACHE',false) ? ((process.cwd(),'dist','config.json')) : ((process.cwd(),'bootstrap','cache','config.json')));
	
	try {
		
		const config = require(location);
		
		return ((φ = _$dotNotationφ.default(config,notation)) != null) ? (φ) : default$;
	} catch (e) {
		
		throw new _$ConfigNotCachedErrorφ.default;
	};
};
exports.default = config;
