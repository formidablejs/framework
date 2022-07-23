function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('@formidablejs/console'/*$path$*/);
var $2 = require('./MakeResourceCommand'/*$path$*/);
var $3 = requireDefault$__(require('@formidablejs/stubs/src/stubs/request/request'/*$path$*/));

class MakeRequestCommand extends $2.MakeResourceCommand {
	
	
	get signature(){
		
		return 'make:request {name}';
	}
	
	get props(){
		
		return {
			name: $1.Prop.string().description('The name of the class')
		};
	}
	
	get description(){
		
		return 'Create a new form request class';
	}
	
	get resource(){
		
		return 'Request';
	}
	
	get stub(){
		
		return new $3.default(this.argument('name'),{},'request',this.language.toLowerCase());
	}
};
exports.MakeRequestCommand = MakeRequestCommand;
