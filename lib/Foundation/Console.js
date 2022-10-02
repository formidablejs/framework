function iter$__(a){ let v; return a ? ((v=a.toIterable) ? v.call(a) : a) : a; };
const $__init__$ = Symbol.for('#__init__'), $__patch__$ = Symbol.for('#__patch__'), $__initor__$ = Symbol.for('#__initor__'), $__inited__$ = Symbol.for('#__inited__'), $__hooks__$ = Symbol.for('#__hooks__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('fs-extra'/*$path$*/);
var $2 = require('path'/*$path$*/);
var $3 = require('child_process'/*$path$*/);

class Console {
	[$__patch__$]($$ = {}){
		var $4;
		($4 = $$.runtime) !== undefined && (this.runtime = $4);
		($4 = $$.console) !== undefined && (this.console = $4);
		($4 = $$.config) !== undefined && (this.config = $4);
		
	}
	[$__init__$]($$ = null,deep = true){
		var $5;
		this.runtime = $$ ? $$.runtime : undefined;
		this.console = $$ ? $$.console : undefined;
		this.config = ($$ && ($5 = $$.config) !== undefined) ? ($5) : {
			stdio: 'inherit',
			cwd: process.cwd()
		};
		
	}
	get ext(){
		
		const appPackage = $2.join(process.cwd(),'package.json');
		
		if (!($1.existsSync(appPackage))) {
			
			return '.imba';
		};
		
		const language = require(appPackage).language || 'imba';
		
		return (language.toLowerCase() == 'typescript') ? '.ts' : '.imba';
	}
	
	/**
	@param {string} runtime
	@param {string} console
	*/
	constructor(runtime = null,console = null){
		this[$__init__$]();
		this.runtime = runtime || $2.join(process.cwd(),'node_modules','.bin','imba' + ((process.platform === 'win32') ? '.cmd' : ''));
		this.console = console || $2.join('bootstrap',("console" + this.ext));
	}
	
	/**
	@param {string} runtime
	@param {string} console
	*/
	static make(runtime = null,console = null){
		
		return new Console(runtime,console);
	}
	
	run(){
		
		const args = ['--'];
		
		for (let $6 = 0, $7 = iter$__(process.argv.slice(2)), $8 = $7.length; $6 < $8; $6++) {
			let arg = $7[$6];
			args.push(arg);
		};
		
		if (process.platform == 'win32') {
			
			const sh = process.env.comspec || 'cmd';
			const shFlag = '/d /s /c';
			this.config.windowsVerbatimArguments = true;
			
			return $3.spawn(sh,[shFlag,this.runtime,this.console,...args],this.config);
		};
		
		return $3.spawn(this.runtime,[this.console,...args],this.config);
	}
};
exports.default = Console;
