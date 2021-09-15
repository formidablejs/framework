function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$pluralizeφ = requireDefault$__(require('pluralize'/*$path$*/));
var _$Configφ = requireDefault$__(require('./Config'/*$path$*/));

const model = _$Configφ.default.bookshelf ? _$Configφ.default.bookshelf.Model : (class fallback {});

class Model extends model {
	
	
	// The table associated with the model.
	// 
	/** @type {string}*/
	
	get tableName(){
		
		return _$pluralizeφ.default(this.constructor.name).replace(/([A-Z])/g,'_$1').trim().toLowerCase().replace(/^\_+/,'');
	}
	
	// Get the route key for the model.
	// 
	// @returns {string}
	
	static get routeKeyName(){
		
		return 'id';
	}
	
	// Retrieve a model by its primary key
	// 
	/** @param   {number}  primaryKey*/
	// @returns {Object|null}
	
	/**
	@param {number} primaryKey
	*/
	static async find(primaryKey){
		
		try {
			
			return await new this({id: primaryKey}).fetch();
		} catch (φ) {
			
			return null;
		};
	}
};
exports.default = Model;
