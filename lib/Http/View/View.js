function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const Ψ_data = Symbol.for('#_data'), Ψ__init__ = Symbol.for('#__init__'), Ψ__initor__ = Symbol.for('#__initor__'), Ψ__inited__ = Symbol.for('#__inited__'), Ψsetup = Symbol.for('#setup');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$dotNotationφ = requireDefault$__(require('../../Support/Helpers/dotNotation'/*$path$*/));
var _$isEmptyφ = requireDefault$__(require('../../Support/Helpers/isEmpty'/*$path$*/));
var _$isStringφ = requireDefault$__(require('../../Support/Helpers/isString'/*$path$*/));
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
		/**@type {Object}*/ this[Ψ_data] = data;
	}
	
	/**
	@param {String} property
	@param {any} default
	*/
	get(property,default$ = null){
		
		const value = _$dotNotationφ.default(this[Ψ_data],property);
		
		if ((value == null || value == undefined) && (default$ == null || default$ == undefined)) {
			
			throw new _$UndefinedDataPropExceptionφ.default('Data prop is undefined.');
		};
		
		return (value != null) ? value : default$;
	}
	
	/**
	@param {String} property
	*/
	has(property){
		
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
		
		this[Ψsetup]();
		
		await this.handle();
		
		await this.beforeRender();
		
		const response = await this.render();
		
		await this.afterRender();
		
		return String(response);
	}
};
exports.default = View;
