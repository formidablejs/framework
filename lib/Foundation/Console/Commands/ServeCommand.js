function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const $address$ = Symbol.for('#address'), $fullAddress$ = Symbol.for('#fullAddress'), $command$ = Symbol.for('#command'), $__init__$ = Symbol.for('#__init__'), $__patch__$ = Symbol.for('#__patch__'), $__initor__$ = Symbol.for('#__initor__'), $__inited__$ = Symbol.for('#__inited__'), $__hooks__$ = Symbol.for('#__hooks__');
var $8 = Symbol();
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('../Command'/*$path$*/);
var $2 = require('path'/*$path$*/);
var $3 = require('fs'/*$path$*/);
var $4 = require('@formidablejs/console'/*$path$*/);
var $5 = require('child_process'/*$path$*/);
var $6 = requireDefault$__(require('../../../Support/Helpers/isNumber'/*$path$*/));
var $7 = requireDefault$__(require('nodemon'/*$path$*/));

class ServeCommand extends $1.Command {
	static [$__init__$](){
		this.prototype[$__initor__$] = $8;
		return this;
	}
	[$__patch__$]($$ = {}){
		var $9;
		super[$__patch__$] && super[$__patch__$]($$);
		($9 = $$[$address$]) !== undefined && (this[$address$] = $9);
		($9 = $$[$fullAddress$]) !== undefined && (this[$fullAddress$] = $9);
		
	}
	constructor(){
		super(...arguments);
		super[$__init__$] || this[$__init__$]();this[$__initor__$]===$8 && (this[$__hooks__$]&&this[$__hooks__$].inited(this),this[$__inited__$] && this[$__inited__$]());
	}
	[$__init__$]($$ = null,deep = true){
		deep && super[$__init__$] && super[$__init__$](...arguments);
		this[$address$] = $$ ? $$[$address$] : undefined;
		this[$fullAddress$] = $$ ? $$[$fullAddress$] : undefined;
		
	}
	get signature(){
		
		return 'serve {?--port} {?--host} {?--dev} {?--addr}';
	}
	
	get description(){
		
		return 'Serve the application on the Imba server';
	}
	
	get props(){
		
		return {
			port: $4.Prop.number().alias('p').default(3000).description('The port to serve the application on'),
			host: $4.Prop.string().alias('h').default('localhost').description('The host address to serve the application on'),
			dev: $4.Prop.boolean().alias('d').description('Serve in dev mode (build, serve and watch)'),
			addr: $4.Prop.boolean().description('Store address in a config file')
		};
	}
	
	get runtime(){
		
		return $2.join(process.cwd(),'node_modules','.bin','imba' + ((process.platform === 'win32') ? '.cmd' : ''));
	}
	
	get devConfigDefaults(){
		
		return {
			commands: [],
			ignore: ['node_modules','dist','test','tests'],
			ext: ['imba','js','ts'],
			delay: 5
		};
	}
	
	get devConfig(){
		
		const appPackage = $2.join(process.cwd(),'package.json');
		
		if (!($3.existsSync(appPackage))) {
			
			this.devConfigDefaults;
		};
		
		return require(appPackage).development || this.devConfigDefaults;
	}
	
	get devCommands(){
		
		const list = this.devConfig.commands || this.devConfigDefaults.commands;
		
		if (!(Array.isArray(list))) {
			
			this.message('error',"Expected \"development.commands\" to be an Array.");
			
			process.exit(1);
		};
		
		return list;
	}
	
	get devIgnore(){
		
		const list = this.devConfig.ignore || this.devConfigDefaults.ignore;
		
		if (!(Array.isArray(list))) {
			
			this.message('error',"Expected \"development.ignore\" to be an Array.");
			
			process.exit(1);
		};
		
		return list;
	}
	
	get devExt(){
		
		const list = this.devConfig.ext || this.devConfigDefaults.ext;
		
		if (!(Array.isArray(list))) {
			
			this.message('error',"Expected \"development.ext\" to be an Array.");
			
			process.exit(1);
		};
		
		return list;
	}
	
	get devDelay(){
		
		const delay = this.devConfig.delay || this.devConfigDefaults.delay;
		
		if (!($6.default(delay))) {
			
			this.message('error',"Expected \"development.delay\" to be an Integer.");
			
			process.exit(1);
		};
		
		return delay;
	}
	
	get commandList(){
		
		const list = this.devCommands;
		
		list.push(("" + this.runtime + " server.imba -f -s -v"));
		
		return list.join(' && ');
	}
	
	get [$command$](){
		
		return this.commandList;
	}
	
	get fallbackPort(){
		
		return (process.env.PORT !== undefined && process.env.PORT !== null) ? process.env.PORT : undefined;
	}
	
	get fallbackHost(){
		
		return (process.env.HOST !== undefined && process.env.HOST !== null) ? process.env.HOST : undefined;
	}
	
	handle(){
		var self = this;
		
		if (isNaN(this.option('port'))) { return this.message('error','Port must be a valid number.') };
		
		this.setEnvVars();
		
		const args = ['-s'];
		
		if (this.option('addr')) { process.env.FORMIDABLE_ADDRESS_SET = '1' };
		
		if (this.option('dev',false) == false) {
			
			const conf = {
				stdio: 'inherit',
				cwd: process.cwd()
			};
			
			if (process.platform === 'win32') {
				
				const sh = process.env.comspec || 'cmd';
				const shFlag = '/d /s /c';
				conf.windowsVerbatimArguments = true;
				
				return $5.spawnSync(sh,[shFlag,this.runtime,'server.imba',...args],conf);
			};
			
			return $5.spawnSync(this.runtime,['server.imba',...args],conf);
		} else {
			
			const server = $7.default({
				ext: this.devExt.join(','),
				exec: this[$command$],
				ignore: this.devIgnore,
				stdout: false,
				delay: this.devDelay
			});
			
			server.on('stdout',function(e) {
				
				const data = e.toString();
				
				if ((self[$address$] == null || self[$address$] == undefined) && data.trim().startsWith('listening on http')) {
					
					self[$address$] = data.split(' ')[2];
					self[$fullAddress$] = data;
					
					self.message('info','Development Server running…');
					
					self.write(("  Local: <u>" + (self[$address$]) + "</u>"));
					
					self.write("  <fg:yellow>Press Ctrl+C to stop the server</fg:yellow>\n");
				};
				
				if (data.trim().startsWith('listening on http') == false) {
					
					return console.log(data.trim());
				};
			});
			
			server.on('stderr',function(e) {
				
				const data = e.toString();
				
				return console.log(data.trim());
			});
			
			server.on('restart',function() {
				
				return self.message('info','Application change detected. Restarting server…');
			});
			
			return server.on('quit',function(e) {
				
				self.message('info','Application shutting down. Stopping server…');
				
				return self.exit();
			});
		};
	}
	
	setEnvVars(){
		
		process.env.FORMIDABLE_PORT = this.option('port',this.fallbackPort);
		return process.env.FORMIDABLE_HOST = this.option('host',this.fallbackHost);
	}
};
exports.ServeCommand = ServeCommand; ServeCommand[$__init__$]();
