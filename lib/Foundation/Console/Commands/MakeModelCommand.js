function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$consoleφ = require('@formidablejs/console'/*$path$*/);
var _$MakeResourceCommandφ = require('./MakeResourceCommand'/*$path$*/);
var _$modelφ = requireDefault$__(require('@formidablejs/stubs/src/stubs/model/model'/*$path$*/));

class MakeModelCommand extends _$MakeResourceCommandφ.MakeResourceCommand {
	
	
	get signature(){
		
		return 'make:model {name}';
	}
	
	get props(){
		
		return {
			name: _$consoleφ.Prop.string().description('The name of the class')
		};
	}
	
	get description(){
		
		return 'Create a new model class';
	}
	
	get resource(){
		
		return 'Model';
	}
	
	get stub(){
		
		return new _$modelφ.default(this.argument('name'),{},'model');
	}
};
exports.MakeModelCommand = MakeModelCommand;
