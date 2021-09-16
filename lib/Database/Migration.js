function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$Databaseφ = requireDefault$__(require('./Database'/*$path$*/));
var _$isEmptyφ = requireDefault$__(require('../Support/Helpers/isEmpty'/*$path$*/));

class Migration {
	
	
	/**
	@param {String} name
	*/
	make(name){
		
		if (_$isEmptyφ.default(_$Databaseφ.default)) { return false };
		
		return _$Databaseφ.default.migrate.make(name);
	}
	
	/**
	@param {String|null} name
	@param {Boolean} up
	*/
	migrate(name = null,up = true){
		
		if (_$isEmptyφ.default(_$Databaseφ.default)) { return false };
		
		const config = {};
		
		if (!(_$isEmptyφ.default(name))) { config.name = name };
		
		return _$Databaseφ.default.migrate[up ? 'up' : 'down'](config);
	}
	
	latest(){
		
		if (_$isEmptyφ.default(_$Databaseφ.default)) { return false };
		
		return _$Databaseφ.default.migrate.latest();
	}
	
	/**
	@param {Boolean} all
	*/
	rollback(all = false){
		
		if (_$isEmptyφ.default(_$Databaseφ.default)) { return false };
		
		return _$Databaseφ.default.migrate.rollback({},all);
	}
	
	list(){
		
		if (_$isEmptyφ.default(_$Databaseφ.default)) { return false };
		
		return _$Databaseφ.default.migrate.list();
	}
};
exports.default = Migration;
