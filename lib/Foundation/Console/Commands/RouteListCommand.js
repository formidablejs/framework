Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$consoleφ = require('@formidablejs/console'/*$path$*/);
var _$consoleφ2 = require('@formidablejs/console'/*$path$*/);
class RouteListCommand extends _$consoleφ.Command {
	
	
	get signature(){
		
		return 'route:list';
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
