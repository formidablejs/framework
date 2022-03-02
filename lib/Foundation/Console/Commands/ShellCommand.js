Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$Commandφ = require('../Command'/*$path$*/);
var _$osφ = require('os'/*$path$*/);
var _$imba_shellφ = require('imba-shell'/*$path$*/);
var _$pathφ = require('path'/*$path$*/);
class ShellCommand extends _$Commandφ.Command {
	
	
	get signature(){
		
		return 'shell';
	}
	
	get description(){
		
		return 'Interact with your application';
	}
	
	get history(){
		
		return _$pathφ.join(_$osφ.homedir(),'.formidable_shell_history');
	}
	
	async handle(){
		var self = this;
		
		const repl = new _$imba_shellφ.ImbaRepl('>>> ',this.history);
		
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
