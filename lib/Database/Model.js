function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('pluralize'/*$path$*/));
var $2 = requireDefault$__(require('./Config'/*$path$*/));

const model = $2.default.bookshelf ? $2.default.bookshelf.Model : (class fallback {});

class Model extends model {
	
	
	// The table associated with the model.
	// 
	/** @type {string}*/
	
	get tableName(){
		
		return $1.default(this.constructor.name).replace(/([A-Z])/g,'_$1').trim().toLowerCase().replace(/^\_+/,'');
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
		} catch ($3) {
			
			return null;
		};
	}
};
exports.default = Model;
