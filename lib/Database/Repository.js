function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('./Database'/*$path$*/));
var $2 = requireDefault$__(require('pluralize'/*$path$*/));

class Repository {
	
	
	get table(){
		
		const className = this.constructor.name.split(/(?=[A-Z])/);
		
		if (className.length > 0 && className[className.length - 1].toLowerCase() == 'repository') {
			
			this.clsasName.pop();
		};
		
		return $2.default(className.join('_').toLowerCase());
	}
	
	get database(){
		
		return $1.default.table(this.table);
	}
	
	get db(){
		
		return $1.default.table(this.table);
	}
};
exports.default = Repository;
