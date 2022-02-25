function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$consoleφ = require('@formidablejs/console'/*$path$*/);
var _$MakeResourceCommandφ = require('./MakeResourceCommand'/*$path$*/);
var _$middlewareφ = requireDefault$__(require('@formidablejs/stubs/src/stubs/middleware/middleware'/*$path$*/));

class MakeMiddlewareCommand extends _$MakeResourceCommandφ.MakeResourceCommand {
	
	
	get signature(){
		
		return 'make:middleware {name}';
	}
	
	get props(){
		
		return {
			name: _$consoleφ.Prop.string().description('The name of the class')
		};
	}
	
	get description(){
		
		return 'Create a new middleware class';
	}
	
	get resource(){
		
		return 'Middleware';
	}
	
	get stub(){
		
		return new _$middlewareφ.default(this.argument('name'),{},'middleware');
	}
};
exports.MakeMiddlewareCommand = MakeMiddlewareCommand;
