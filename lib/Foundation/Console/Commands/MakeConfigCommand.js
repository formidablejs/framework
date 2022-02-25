function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$consoleφ = require('@formidablejs/console'/*$path$*/);
var _$MakeResourceCommandφ = require('./MakeResourceCommand'/*$path$*/);
var _$configφ = requireDefault$__(require('@formidablejs/stubs/src/stubs/config/config'/*$path$*/));

class MakeConfigCommand extends _$MakeResourceCommandφ.MakeResourceCommand {
	
	
	get signature(){
		
		return 'make:config {name}';
	}
	
	get props(){
		
		return {
			name: _$consoleφ.Prop.string().description('The name of the file')
		};
	}
	
	get description(){
		
		return 'Create a new config file';
	}
	
	get resource(){
		
		return 'Config';
	}
	
	get stub(){
		
		return new _$configφ.default(this.argument('name'),{},'config');
	}
};
exports.MakeConfigCommand = MakeConfigCommand;
