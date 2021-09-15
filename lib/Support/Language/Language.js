function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const Ψ__init__ = Symbol.for('#__init__'), Ψ__initor__ = Symbol.for('#__initor__'), Ψ__inited__ = Symbol.for('#__inited__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$dotNotationφ = requireDefault$__(require('../Helpers/dotNotation'/*$path$*/));
var _$fsφ = requireDefault$__(require('fs'/*$path$*/));
var _$pathφ = requireDefault$__(require('path'/*$path$*/));

function getDirectories(location){
	
	const all = [];
	
	_$fsφ.default.readdirSync(location).forEach(function(folder) {
		
		if (_$fsφ.default.statSync(_$pathφ.default.join(location,folder)).isDirectory()) { return all.push(folder) };
	});
	
	return all;
};

class Language {
	constructor($$ = null){
		this[Ψ__init__]($$);
	}
	[Ψ__init__]($$ = null){
		var vφ;
		this.lang = ($$ && (vφ = $$.lang) !== undefined) ? (vφ) : {
			locale: null,
			fallback_locale: null,
			packs: {}
		};
		
	}
	get locale(){
		
		return this.lang.locale;
	}
	
	get fallbackLocale(){
		
		return this.lang.fallback_locale;
	}
	
	get packs(){
		
		return this.lang.packs;
	}
	
	/**
	@param {String} locale
	*/
	setLocale(locale){
		
		this.lang.locale = locale;
		
		return this;
	}
	
	/**
	@param {String} locale
	*/
	setFallbackLocale(locale){
		
		this.lang.fallback_locale = locale;
		
		return this;
	}
	
	/**
	@param {String} location
	*/
	register(location){
		var self = this;
		
		const packs = getDirectories(location);
		
		packs.forEach(function(pack) {
			
			if (!self.lang.packs[pack]) {
				
				self.lang.packs[pack] = {};
			};
			
			return _$fsφ.default.readdirSync(_$pathφ.default.join(location,pack)).forEach(function(file) {
				
				if (_$pathφ.default.extname(file) == '.json') {
					
					const definition = {
						[_$pathφ.default.parse(file).name]: require(_$pathφ.default.join(location,pack,file))
					};
					
					if (!definition) {
						
						throw new Error(("Can't resolve language pack: \"" + _$pathφ.default.join(location,pack,file) + "\""));
					};
					
					return self.lang.packs[pack] = Object.assign(
						self.lang.packs[pack],
						definition
					);
				};
			});
		});
		return this;
	}
	
	/**
	@param {String} path
	@param {String} default
	*/
	get(path,default$){
		var φ;
		
		const output = ((φ = _$dotNotationφ.default(this.lang.packs,("" + (this.lang.locale) + "." + path))) != null) ? (φ) : _$dotNotationφ.default(this.lang.packs,("" + (this.lang.fallback_locale) + "." + path));
		
		return (output !== undefined && output !== null) ? output : default$;
	}
	
	unset(){
		
		return this.lang = {
			locale: null,
			fallback_locale: null,
			packs: {}
		};
	}
};
exports.default = Language;
