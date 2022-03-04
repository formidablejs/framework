function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$consoleφ = require('@formidablejs/console'/*$path$*/);
var _$MakeResourceCommandφ = require('./MakeResourceCommand'/*$path$*/);
var _$commandφ = requireDefault$__(require('@formidablejs/stubs/src/stubs/command/command'/*$path$*/));

class MakeCommandCommand extends _$MakeResourceCommandφ.MakeResourceCommand {
	
	
	get signature(){
		
		return 'make:command {name}';
	}
	
	get props(){
		
		return {
			name: _$consoleφ.Prop.string().description('The name of the class')
		};
	}
	
	get description(){
		
		return 'Create a new command class';
	}
	
	get resource(){
		
		return 'Command';
	}
	
	get stub(){
		
		return new _$commandφ.default(this.argument('name'),{},'command');
	}
};
exports.MakeCommandCommand = MakeCommandCommand;
