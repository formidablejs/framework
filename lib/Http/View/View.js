function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const Ψdata = Symbol.for('#data'), Ψsetup = Symbol.for('#setup'), Ψ__init__ = Symbol.for('#__init__'), Ψ__initor__ = Symbol.for('#__initor__'), Ψ__inited__ = Symbol.for('#__inited__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$UndefinedDataPropExceptionφ = requireDefault$__(require('./Exceptions/UndefinedDataPropException'/*$path$*/));
var _$isStringφ = requireDefault$__(require('../../Support/Helpers/isString'/*$path$*/));
var _$isEmptyφ = requireDefault$__(require('../../Support/Helpers/isEmpty'/*$path$*/));

class View {
	[Ψ__init__]($$ = null){
		var vφ;
		this[Ψdata] = ($$ && (vφ = $$[Ψdata]) !== undefined) ? (vφ) : {};
		
	}
	/**
	@param {Object} data
	*/
	constructor(data = {}){
		this[Ψ__init__]();
		/**@type {Object}*/ this[Ψdata] = data;
	}
	
	[Ψsetup](){
		var resφ;
		
		resφ = [];
		for (let oφ = this[Ψdata], iφ = 0, keysφ = Object.keys(oφ), lφ = keysφ.length, key, value; iφ < lφ; iφ++){
			key = keysφ[iφ];value = oφ[key];
			resφ.push((!(_$isEmptyφ.default(value))) && (
				
				this[key] = value
			));
		};
		return resφ;
	}
	
	/**
	@param {String} property
	@param {any} default
	*/
	get(property,default$ = null){
		
		const value = this[property];
		
		if ((value == null || value == undefined) && _$isEmptyφ.default(default$)) {
			
			throw new _$UndefinedDataPropExceptionφ.default('Data prop is undefined.');
		};
		
		return (value != null) ? value : default$;
	}
	
	/**
	@param {String} property
	*/
	has(property){
		
		return this[property] != null && this[property] != undefined;
	}
	
	beforeRender(){
		
		return null;
	}
	
	afterRender(){
		
		return null;
	}
	
	handle(){
		
		return null;
	}
	
	render(){
		
		return null;
	}
	
	async make(){
		
		this[Ψsetup]();
		
		await this.handle();
		
		await this.beforeRender();
		
		const response = await this.render();
		
		await this.afterRender();
		
		return String(response);
	}
};
exports.default = View;
