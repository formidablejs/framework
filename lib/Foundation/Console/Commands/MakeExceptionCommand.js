function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('@formidablejs/console'/*$path$*/);
var $2 = require('./MakeResourceCommand'/*$path$*/);
var $3 = requireDefault$__(require('@formidablejs/stubs/src/stubs/exception/exception'/*$path$*/));

class MakeExceptionCommand extends $2.MakeResourceCommand {
	
	
	get signature(){
		
		return 'make:exception {name}';
	}
	
	get props(){
		
		return {
			name: $1.Prop.string().description('The name of the class')
		};
	}
	
	get description(){
		
		return 'Create a new exception class';
	}
	
	get resource(){
		
		return 'Exception';
	}
	
	get stub(){
		
		return new $3.default(this.argument('name'),{},'exception');
	}
};
exports.MakeExceptionCommand = MakeExceptionCommand;
