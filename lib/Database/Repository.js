function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('./Database'/*$path$*/));
var $2 = requireDefault$__(require('pluralize'/*$path$*/));

class Repository {
	
	
	get tableName(){
		
		const className = this.constructor.name.split(/(?=[A-Z])/);
		
		if (className.length > 0 && className[className.length - 1].toLowerCase() == 'repository') {
			
			className.pop();
		};
		
		return $2.default(className.join('_').toLowerCase());
	}
	
	get db(){
		
		return $1.default;
	}
	
	get database(){
		
		return $1.default;
	}
	
	get table(){
		
		return $1.default.table(this.tableName);
	}
};
exports.default = Repository;
