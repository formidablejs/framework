Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('@formidablejs/console'/*$path$*/);
var $2 = require('@formidablejs/console'/*$path$*/);
class RouteListCommand extends $1.Command {
	
	
	get signature(){
		
		return 'route:list';
	}
	
	get description(){
		
		return 'List all registered routes';
	}
	
	// @returns {Application}
	get app(){
		
		return this.constructor.ctx;
	}
	
	handle(){
		
		return this.table(this.app.routes());
	}
};
exports.RouteListCommand = RouteListCommand;
