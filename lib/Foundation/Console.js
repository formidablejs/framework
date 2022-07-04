const $__init__$ = Symbol.for('#__init__'), $__patch__$ = Symbol.for('#__patch__'), $__initor__$ = Symbol.for('#__initor__'), $__inited__$ = Symbol.for('#__inited__'), $__hooks__$ = Symbol.for('#__hooks__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('path'/*$path$*/);
var $2 = require('child_process'/*$path$*/);

class Console {
	[$__patch__$]($$ = {}){
		var $3;
		($3 = $$.runtime) !== undefined && (this.runtime = $3);
		($3 = $$.console) !== undefined && (this.console = $3);
		($3 = $$.config) !== undefined && (this.config = $3);
		
	}
	[$__init__$]($$ = null,deep = true){
		var $4;
		this.runtime = $$ ? $$.runtime : undefined;
		this.console = $$ ? $$.console : undefined;
		this.config = ($$ && ($4 = $$.config) !== undefined) ? ($4) : {
			stdio: 'inherit',
			cwd: process.cwd()
		};
		
	}
	/**
	@param {String} runtime
	@param {String} console
	*/
	constructor(runtime,console){
		this[$__init__$]();
		this.runtime = runtime || $1.join(process.cwd(),'node_modules','.bin','imbar');
		this.console = console || $1.join('bootstrap','console.imba');
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
