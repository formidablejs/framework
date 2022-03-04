function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('./Database'/*$path$*/));
var $2 = requireDefault$__(require('../Support/Helpers/isEmpty'/*$path$*/));

class Migration {
	
	
	/**
	@param {String} name
	*/
	make(name){
		
		if ($2.default($1.default)) { return false };
		
		return $1.default.migrate.make(name);
	}
	
	/**
	@param {String|null} name
	@param {Boolean} up
	*/
	migrate(name = null,up = true){
		
		if ($2.default($1.default)) { return false };
		
		const config = {};
		
		if (!($2.default(name))) { config.name = name };
		
		return $1.default.migrate[up ? 'up' : 'down'](config);
	}
	
	latest(){
		
		if ($2.default($1.default)) { return false };
		
		return $1.default.migrate.latest();
	}
	
	/**
	@param {Boolean} all
	*/
	rollback(all = false){
		
		if ($2.default($1.default)) { return false };
		
		return $1.default.migrate.rollback({},all);
	}
	
	list(){
		
		if ($2.default($1.default)) { return false };
		
		return $1.default.migrate.list();
	}
};
exports.default = Migration;
