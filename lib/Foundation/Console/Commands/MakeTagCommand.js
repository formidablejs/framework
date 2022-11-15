function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('@formidablejs/console'/*$path$*/);
var $2 = require('./MakeResourceCommand'/*$path$*/);
var $3 = requireDefault$__(require('@formidablejs/stubs/src/stubs/tag/tag'/*$path$*/));

class MakeTagCommand extends $2.MakeResourceCommand {
	
	
	get signature(){
		
		return 'make:tag {name}';
	}
	
	get props(){
		
		return {
			name: $1.Prop.string().description('The name of the tag')
		};
	}
	
	get description(){
		
		return 'Create a new imba tag';
	}
	
	get resource(){
		
		return 'Tag';
	}
	
	get stub(){
		
		return new $3.default(this.argument('name'),{},'tag');
	}
};
exports.MakeTagCommand = MakeTagCommand;
