const Ψinit = Symbol.for('#init');

const {dotNotation: dot} = require('@formidablejs/helpers'/*$path$*/);
const fs = require('fs'/*$path$*/);
const path = require('path'/*$path$*/);

function getDirectories(location){
	
	const all = [];
	
	fs.readdirSync(location).forEach(function(folder) {
		
		if (fs.statSync(path.join(location,folder)).isDirectory()) { return all.push(folder) };
	});
	
	return all;
};

module.exports = class Language {
	constructor($$ = null){
		this[Ψinit]($$);
	}
	[Ψinit]($$ = null){
		var φ;
		this.lang = ($$ && (φ = $$.lang) !== undefined) ? (φ) : {
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
			
			return fs.readdirSync(path.join(location,pack)).forEach(function(file) {
				
				if (path.extname(file) == '.json') {
					
					const definition = {
						[path.parse(file).name]: require(path.join(location,pack,file))
					};
					
					if (!definition) {
						
						throw new Error(("Can't resolve language pack: \"" + path.join(location,pack,file) + "\""));
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
		var φ2;
		
		const output = ((φ2 = dot(this.lang.packs,("" + (this.lang.locale) + "." + path))) != null) ? (φ2) : dot(this.lang.packs,("" + (this.lang.fallback_locale) + "." + path));
		
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
