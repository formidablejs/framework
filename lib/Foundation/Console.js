function iter$__(a){ let v; return a ? ((v=a.toIterable) ? v.call(a) : a) : a; };
const $__init__$ = Symbol.for('#__init__'), $__patch__$ = Symbol.for('#__patch__'), $__initor__$ = Symbol.for('#__initor__'), $__inited__$ = Symbol.for('#__inited__'), $__hooks__$ = Symbol.for('#__hooks__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('@formidablejs/console'/*$path$*/);
var $2 = require('fs-extra'/*$path$*/);
var $3 = require('path'/*$path$*/);
var $4 = require('child_process'/*$path$*/);

class Console {
	[$__patch__$]($$ = {}){
		var $5;
		($5 = $$.runtime) !== undefined && (this.runtime = $5);
		($5 = $$.console) !== undefined && (this.console = $5);
		($5 = $$.config) !== undefined && (this.config = $5);
		
	}
	[$__init__$]($$ = null,deep = true){
		var $6;
		this.runtime = $$ ? $$.runtime : undefined;
		this.console = $$ ? $$.console : undefined;
		this.config = ($$ && ($6 = $$.config) !== undefined) ? ($6) : {
			stdio: 'inherit',
			cwd: process.cwd()
		};
		
	}
	get devConfigDefaults(){
		
		return {
			mode: 'imba'// nodemon
		};
	}
	
	get devConfig(){
		
		const appPackage = $3.join(process.cwd(),'package.json');
		
		if (!($2.existsSync(appPackage))) {
			
			this.devConfigDefaults;
		};
		
		return require(appPackage).development || this.devConfigDefaults;
	}
	
	get devMode(){
		
		const mode = this.devConfig.mode || this.devConfigDefaults.mode;
		
		if (!(['nodemon','imba'].includes(mode.toLowerCase()))) {
			
			$1.Output.write("\n  <bg:red> ERROR </bg:red> Invalid dev mode option. Expected \"nodemon\", or \"imba\".\n");
			
			process.exit(1);
		};
		
		return mode;
	}
	
	get ext(){
		
		const appPackage = $3.join(process.cwd(),'package.json');
		
		if (!($2.existsSync(appPackage))) {
			
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
		this.runtime = runtime || $3.join(process.cwd(),'node_modules','.bin','imba' + ((process.platform === 'win32') ? '.cmd' : ''));
		this.console = console || $3.join('bootstrap',("console" + this.ext));
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
		
		for (let $7 = 0, $8 = iter$__(process.argv.slice(2)), $9 = $8.length; $7 < $9; $7++) {
			let arg = $8[$7];
			args.push(arg);
		};
		
		if (this.devMode == 'imba' && args[1] == 'serve' && args[2] == '--dev' && !((args.includes('-h') || args.includes('--help') || args.includes('-V') || args.includes('--version')))) {
			
			let port = 3000;
			let host = '';
			
			args.forEach(function(arg) {
				
				if (arg.startsWith('--port')) {
					
					port = arg.split('=')[1];
				};
				
				if (arg.startsWith('--host')) {
					
					return host = arg.split('=')[1];
				};
			});
			
			const srv = './node_modules/@formidablejs/framework/bin/imba/server.imba';
			
			const instance = $4.spawn(this.runtime,[srv,'-s','-w','--',("--port=" + port),("--host=" + host)],{
				stdio: 'pipe',
				cwd: process.cwd()
			});
			
			let address;
			
			instance.stdout.on('data',function(data) {
				
				const line = data.toString();
				
				if (address == null || address == undefined) {
					
					if (line.includes("\x1b[1m./node_modules/@formidablejs/framework/bin/imba/server.imba") && line.includes('listening on')) {
						
						address = line.split('listening on ')[1];
						
						$1.Output.write("\n  <bg:blue> INFO </bg:blue> Development Server running…\n");
						
						$1.Output.write(("  Local: <u>" + address + "</u>"));
						
						return $1.Output.write("  <fg:yellow>Press Ctrl+C to stop the server</fg:yellow>\n");
					};
				} else {
					
					if (!(line.includes("\x1b[1mnode_modules/@formidablejs/framework/bin/imba/server.imba")) && !(line.includes("\x1b[1m./node_modules/@formidablejs/framework/bin/imba/server.imba"))) {
						
						return process.stdout.write(line);
					};
				};
			});
			
			instance.stderr.on('data',function(data) {
				
				return process.stdout.write(data.toString());
			});
			
			instance.on('exit',function() {
				
				return process.exit();
			});
			
			process.on('exit',function() {
				
				return instance.kill();
			});
			
			return;
		};
		
		if (process.platform == 'win32') {
			
			const sh = process.env.comspec || 'cmd';
			const shFlag = '/d /s /c';
			this.config.windowsVerbatimArguments = true;
			
			return $4.spawn(sh,[shFlag,this.runtime,this.console,...args],this.config);
		};
		
		return $4.spawn(this.runtime,[this.console,...args],this.config);
	}
};
exports.default = Console;
