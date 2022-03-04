Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('../Command'/*$path$*/);
var $2 = require('os'/*$path$*/);
var $3 = require('imba-shell'/*$path$*/);
var $4 = require('path'/*$path$*/);
class ShellCommand extends $1.Command {
	
	
	get signature(){
		
		return 'shell';
	}
	
	get description(){
		
		return 'Interact with your application';
	}
	
	get history(){
		
		return $4.join($2.homedir(),'.formidable_shell_history');
	}
	
	async handle(){
		var self = this;
		
		const repl = new $3.ImbaRepl('>>> ',this.history);
		
		repl.registerCallback(function(ctx) {
			
			const context = self.app.context.registered;
			
			return Object.keys(context).forEach(function(key) { if (!ctx[key]) { return ctx[key] = context[key] }; });
		});
		
		/** @type {REPLServer} */
		
		const server = await repl.run();
		
		return server.on('exit',function() { return self.exit(); });
	}
};
exports.ShellCommand = ShellCommand;
