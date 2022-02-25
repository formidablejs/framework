function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$consoleφ = require('@formidablejs/console'/*$path$*/);
var _$MakeResourceCommandφ = require('./MakeResourceCommand'/*$path$*/);
var _$exceptionφ = requireDefault$__(require('@formidablejs/stubs/src/stubs/exception/exception'/*$path$*/));

class MakeExceptionCommand extends _$MakeResourceCommandφ.MakeResourceCommand {
	
	
	get signature(){
		
		return 'make:exception {name}';
	}
	
	get props(){
		
		return {
			name: _$consoleφ.Prop.string().description('The name of the class')
		};
	}
	
	get description(){
		
		return 'Create a new exception class';
	}
	
	get resource(){
		
		return 'Exception';
	}
	
	get stub(){
		
		return new _$exceptionφ.default(this.argument('name'),{},'exception');
	}
};
exports.MakeExceptionCommand = MakeExceptionCommand;
