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
	constructor($$ = null){
		this[$3]($$);
	}
	[$3]($$ = null){
		var $7;
		this.runtime = ($$ && ($7 = $$.runtime) !== undefined) ? ($7) : $1.join(process.cwd(),'node_modules','.bin','imbar');
		this.console = ($$ && ($7 = $$.console) !== undefined) ? ($7) : $1.join(process.cwd(),'bootstrap','console.imba');
		this.config = ($$ && ($7 = $$.config) !== undefined) ? ($7) : {
			stdio: 'inherit',
			cwd: process.cwd()
		};
		
	}
	;
	
	
	
	static make(){
		
		return new Console;
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
