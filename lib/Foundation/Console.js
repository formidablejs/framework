const $3 = Symbol.for('#__init__'), $4 = Symbol.for('#__patch__'), $8 = Symbol.for('#__initor__'), $9 = Symbol.for('#__inited__'), $5 = Symbol.for('#__hooks__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('path'/*$path$*/);
var $2 = require('child_process'/*$path$*/);

class Console {
	[$4]($$ = {}){
		var $6;
		($6 = $$.runtime) !== undefined && (this.runtime = $6);
		($6 = $$.console) !== undefined && (this.console = $6);
		($6 = $$.config) !== undefined && (this.config = $6);
		
	}
	[$3]($$ = null){
		var $7;
		this.runtime = $$ ? $$.runtime : undefined;
		this.console = $$ ? $$.console : undefined;
		this.config = ($$ && ($7 = $$.config) !== undefined) ? ($7) : {
			stdio: 'inherit',
			cwd: process.cwd()
		};
		
	}
	/**
	@param {String} runtime
	@param {String} console
	*/
	constructor(runtime,console){
		this[$3]();
		this.runtime = runtime || $1.join(process.cwd(),'node_modules','.bin','imbar');
		this.console = console || $1.join(process.cwd(),'bootstrap','console.imba');
	}
	
	static make(runtime,console){
		
		return new Console(runtime,console);
	}
	
	run(){
		
		if (process.platform == 'win32') {
			
			const sh = process.env.comspec || 'cmd';
			const shFlag = '/d /s /c';
			this.config.windowsVerbatimArguments = true;
			
			return $2.spawn(sh,[shFlag,this.runtime,this.console,...process.argv.slice(2)],this.config);
		};
		
		return $2.spawn(this.runtime,[this.console,...process.argv.slice(2)],this.config);
	}
};
exports.default = Console;
