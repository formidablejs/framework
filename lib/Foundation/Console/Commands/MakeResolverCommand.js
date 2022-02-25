function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$consoleφ = require('@formidablejs/console'/*$path$*/);
var _$MakeResourceCommandφ = require('./MakeResourceCommand'/*$path$*/);
var _$resolverφ = requireDefault$__(require('@formidablejs/stubs/src/stubs/resolver/resolver'/*$path$*/));

class MakeResolverCommand extends _$MakeResourceCommandφ.MakeResourceCommand {
	
	
	get signature(){
		
		return 'make:resolver {name}';
	}
	
	get props(){
		
		return {
			name: _$consoleφ.Prop.string().description('The name of the class')
		};
	}
	
	get description(){
		
		return 'Create a new resolver class';
	}
	
	get resource(){
		
		return 'Resolver';
	}
	
	get stub(){
		
		return new _$resolverφ.default(this.argument('name'),{},'resolver');
	}
};
exports.MakeResolverCommand = MakeResolverCommand;
