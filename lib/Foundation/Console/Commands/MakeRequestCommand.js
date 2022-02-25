function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$consoleφ = require('@formidablejs/console'/*$path$*/);
var _$MakeResourceCommandφ = require('./MakeResourceCommand'/*$path$*/);
var _$requestφ = requireDefault$__(require('@formidablejs/stubs/src/stubs/request/request'/*$path$*/));

class MakeRequestCommand extends _$MakeResourceCommandφ.MakeResourceCommand {
	
	
	get signature(){
		
		return 'make:request {name}';
	}
	
	get props(){
		
		return {
			name: _$consoleφ.Prop.string().description('The name of the class')
		};
	}
	
	get description(){
		
		return 'Create a new form request class';
	}
	
	get resource(){
		
		return 'Request';
	}
	
	get stub(){
		
		return new _$requestφ.default(this.argument('name'),{},'request');
	}
};
exports.MakeRequestCommand = MakeRequestCommand;
