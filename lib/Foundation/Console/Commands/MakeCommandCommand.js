function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('@formidablejs/console'/*$path$*/);
var $2 = require('./MakeResourceCommand'/*$path$*/);
var $3 = requireDefault$__(require('@formidablejs/stubs/src/stubs/command/command'/*$path$*/));

class MakeCommandCommand extends $2.MakeResourceCommand {
	
	
	get signature(){
		
		return 'make:command {name}';
	}
	
	get props(){
		
		return {
			name: $1.Prop.string().description('The name of the class')
		};
	}
	
	get description(){
		
		return 'Create a new command class';
	}
	
	get resource(){
		
		return 'Command';
	}
	
	get stub(){
		
		return new $3.default(this.argument('name'),{},'command');
	}
};
exports.MakeCommandCommand = MakeCommandCommand;
