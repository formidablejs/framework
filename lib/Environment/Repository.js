function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const Ψ__init__ = Symbol.for('#__init__'), Ψ__initor__ = Symbol.for('#__initor__'), Ψ__inited__ = Symbol.for('#__inited__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$dotenvφ = requireDefault$__(require('dotenv'/*$path$*/));
var _$fsφ = requireDefault$__(require('fs'/*$path$*/));
var _$isEmptyφ = requireDefault$__(require('../Support/Helpers/isEmpty'/*$path$*/));
var _$isStringφ = requireDefault$__(require('../Support/Helpers/isString'/*$path$*/));
var _$pathφ = requireDefault$__(require('path'/*$path$*/));

class Repository {
	[Ψ__init__]($$ = null){
		var vφ;
		this.variables = ($$ && (vφ = $$.variables) !== undefined) ? (vφ) : {};
		
	}
	/**
	@param {String} root
	*/
	constructor(root){
		var φ;
		this[Ψ__init__]();
		let env = process.env.BUILD_ENV ? (("." + (process.env.BUILD_ENV))) : '';
		
		const envPath = _$pathφ.default.join(root,(".env" + env));
		
		env = _$fsφ.default.existsSync(envPath) ? envPath : _$pathφ.default.join(root,'.env');
		
		_$dotenvφ.default.config({
			path: env
		});
		
		(((φ = process.env.BUILD_ENV),delete process.env.BUILD_ENV, φ));
		
		this.variables = process.env;
	}
	
	/**
	@param {String} key
	@param {any} default
	*/
	get(key,default$ = null){
		var self = this;
		
		if (!(_$isStringφ.default(key))) { throw new TypeError('Expected string.') };
		
		let output = this.variables[key];
		
		// if (output !== undefined && output !== null) && output.startsWith('${') && output.endsWith('}')
		// 	output = self.variables[output.slice(2, -1)]
		
		if (_$isStringφ.default(output)) {
			
			const results = output.match(/\$\{(.*?)\}/g);
			
			if (!(_$isEmptyφ.default(results))) {
				
				results.forEach(function(variable) {
					
					return output = output.replaceAll(variable,self.variables[variable.slice(2,-1)]);
				});
			};
		};
		
		if (output === undefined || output === null) {
			
			return default$;
		};
		
		return ['true','false'].includes(output.toLowerCase()) ? (output = JSON.parse(output)) : output;
	}
};
exports.default = Repository;
