function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$consoleφ = require('@formidablejs/console'/*$path$*/);
var _$MakeResourceCommandφ = require('./MakeResourceCommand'/*$path$*/);
var _$mailφ = requireDefault$__(require('@formidablejs/stubs/src/stubs/mail/mail'/*$path$*/));

class MakeMailCommand extends _$MakeResourceCommandφ.MakeResourceCommand {
	
	
	get signature(){
		
		return 'make:mail {name}';
	}
	
	get props(){
		
		return {
			name: _$consoleφ.Prop.string().description('The name of the class')
		};
	}
	
	get description(){
		
		return 'Create a new email class';
	}
	
	get resource(){
		
		return 'Mail';
	}
	
	get stub(){
		
		return new _$mailφ.default(this.argument('name'),{},'mail');
	}
};
exports.MakeMailCommand = MakeMailCommand;
