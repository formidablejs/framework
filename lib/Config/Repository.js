const Ψinit = Symbol.for('#init');

const {dotNotation: dot} = require('@formidablejs/helpers'/*$path$*/);

module.exports = class Repository {
	constructor($$ = null){
		this[Ψinit]($$);
	}
	[Ψinit]($$ = null){
		var φ;
		this.temp = ($$ && (φ = $$.temp) !== undefined) ? (φ) : {};
		
	}
	
	
	// All of the configuration items.
	get registered(){
		
		return new Object;
	}
	
	/**
	@param {String} key
	*/
	has(key){
		
		let tempCheck = dot(this.temp,key);
		
		if (tempCheck !== undefined && tempCheck !== null) { return true };
		
		return dot(this.registered,key) !== undefined && dot(this.registered,key) !== null;
	}
	
	/**
	@param {String} key
	@param {any} default
	*/
	get(key,default$){
		
		let tempValue = dot(this.temp,key);
		
		if (tempValue !== undefined && tempValue !== null) { tempValue };
		
		const output = dot(this.registered,key);
		
		return (output != null) ? output : default$;
	}
	
	/**
	@param {String} key
	@param {any} value
	*/
	set(key,value){
		
		return this.temp[key] = value;
	}
	
	all(){
		
		return this.registered;
	}
};
