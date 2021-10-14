function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const Ψ_data = Symbol.for('#_data'), Ψ__init__ = Symbol.for('#__init__'), Ψ__initor__ = Symbol.for('#__initor__'), Ψ__inited__ = Symbol.for('#__inited__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$dotNotationφ = requireDefault$__(require('../../Support/Helpers/dotNotation'/*$path$*/));
var _$isObjectφ = requireDefault$__(require('../../Support/Helpers/isObject'/*$path$*/));
var _$isStringφ = requireDefault$__(require('../../Support/Helpers/isString'/*$path$*/));
var _$querystringφ = requireDefault$__(require('querystring'/*$path$*/));
var _$UndefinedDataPropExceptionφ = requireDefault$__(require('./Exceptions/UndefinedDataPropException'/*$path$*/));

class View {
	[Ψ__init__]($$ = null){
		var vφ;
		this[Ψ_data] = ($$ && (vφ = $$[Ψ_data]) !== undefined) ? (vφ) : {};
		
	}
	/**
	@param {Object} data
	*/
	constructor(data = {}){
		this[Ψ__init__]();
		if (!(_$isObjectφ.default(data))) { throw TypeError("Expected object.") };
		
		/**@type {Object}*/ this[Ψ_data] = data;
	}
	
	/**
	@param {String} property
	@param {any} default
	@param {boolean} escape
	*/
	get(property,default$ = null,escape = true){
		
		if (!(_$isStringφ.default(property))) { throw TypeError("Expected string.") };
		
		const value = _$dotNotationφ.default(this[Ψ_data],property);
		
		if ((value == null || value == undefined) && (default$ == null || default$ == undefined)) {
			
			throw new _$UndefinedDataPropExceptionφ.default('Data prop is undefined.');
		};
		
		if (value) { return escape ? _$querystringφ.default.escape(value) : value };
		
		return default$;
	}
	
	/**
	@param {String} property
	@param {any} default
	*/
	raw(property,default$ = null){
		
		return this.get(property,default$,false);
	}
	
	/**
	@param {String} property
	*/
	has(property){
		
		if (!(_$isStringφ.default(property))) { throw TypeError("Expected string.") };
		
		return _$dotNotationφ.default(this[Ψ_data],property) != null && _$dotNotationφ.default(this[Ψ_data],property) != undefined;
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
		
		await this.handle();
		
		await this.beforeRender();
		
		const response = await this.render();
		
		await this.afterRender();
		
		return String(response);
	}
};
exports.default = View;