Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$consoleφ = require('@formidablejs/console'/*$path$*/);
class Command extends _$consoleφ.Command {
	
	
	// @returns {Application}
	get app(){
		
		return this.constructor.ctx;
	}
};
exports.Command = Command;
