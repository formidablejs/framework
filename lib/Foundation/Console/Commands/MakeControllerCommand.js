function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$consoleφ = require('@formidablejs/console'/*$path$*/);
var _$MakeResourceCommandφ = require('./MakeResourceCommand'/*$path$*/);
var _$controllerφ = requireDefault$__(require('@formidablejs/stubs/src/stubs/controller/controller'/*$path$*/));

class MakeControllerCommand extends _$MakeResourceCommandφ.MakeResourceCommand {
	
	
	get signature(){
		
		return 'make:controller {name}';
	}
	
	get props(){
		
		return {
			name: _$consoleφ.Prop.string().description('The name of the class')
		};
	}
	
	get description(){
		
		return 'Create a new controller class';
	}
	
	get resource(){
		
		return 'Controller';
	}
	
	get stub(){
		
		return new _$controllerφ.default(this.argument('name'),{},'controller');
	}
};
exports.MakeControllerCommand = MakeControllerCommand;
