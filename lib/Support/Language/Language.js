function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const $__init__$ = Symbol.for('#__init__'), $__patch__$ = Symbol.for('#__patch__'), $__initor__$ = Symbol.for('#__initor__'), $__inited__$ = Symbol.for('#__inited__'), $__hooks__$ = Symbol.for('#__hooks__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('../Helpers/dotNotation'/*$path$*/));
var $2 = requireDefault$__(require('fs'/*$path$*/));
var $3 = requireDefault$__(require('path'/*$path$*/));

function getDirectories(location){
	
	const all = [];
	
	$2.default.readdirSync(location).forEach(function(folder) {
		
		if ($2.default.statSync($3.default.join(location,folder)).isDirectory()) { return all.push(folder) };
	});
	
	return all;
};

class Language {
	[$__patch__$]($$ = {}){
		var $4;
		($4 = $$.lang) !== undefined && (this.lang = $4);
		
	}
	constructor($$ = null){
		this[$__init__$]($$);
	}
	[$__init__$]($$ = null,deep = true){
		var $5;
		this.lang = ($$ && ($5 = $$.lang) !== undefined) ? ($5) : {
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
			
			if (!(self.lang.packs[pack])) {
				
				self.lang.packs[pack] = {};
			};
			
			return $2.default.readdirSync($3.default.join(location,pack)).forEach(function(file) {
				
				if ($3.default.extname(file) == '.json') {
					
					const definition = {
						[$3.default.parse(file).name]: require($3.default.join(location,pack,file))
					};
					
					if (!definition) {
						
						throw new Error(("Can't resolve language pack: \"" + $3.default.join(location,pack,file) + "\""));
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
		var $6;
		
		const output = (($6 = $1.default(this.lang.packs,("" + (this.lang.locale) + "." + path))) != null) ? ($6) : $1.default(this.lang.packs,("" + (this.lang.fallback_locale) + "." + path));
		
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
