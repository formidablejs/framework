function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$Applicationφ = requireDefault$__(require('../../Foundation/Application'/*$path$*/));
var _$isEmptyφ = requireDefault$__(require('./isEmpty'/*$path$*/));
var _$isStringφ = requireDefault$__(require('./isString'/*$path$*/));

/**
@param {String} key
@param {any} default
*/
function env(key,default$ = null){
	
	try {
		return _$Applicationφ.default.getEnv(key,default$);
	} catch (φ) {
		
		if (!(_$isStringφ.default(key))) { throw new TypeError('Expected string.') };
		
		let output = process.env[key];
		
		if (_$isStringφ.default(output)) {
			
			const results = output.match(/\$\{(.*?)\}/g);
			
			if (!(_$isEmptyφ.default(results))) {
				
				results.forEach(function(variable) {
					
					return output = output.replaceAll(variable,process.env[variable.slice(2,-1)]);
				});
			};
		};
		
		if (output === undefined || output === null) {
			
			return default$;
		};
		
		return ['true','false'].includes(output.toLowerCase()) ? (output = JSON.parse(output)) : output;
	};
};
exports.default = env;
