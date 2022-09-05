function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const $address$ = Symbol.for('#address'), $fullAddress$ = Symbol.for('#fullAddress'), $command$ = Symbol.for('#command'), $__init__$ = Symbol.for('#__init__'), $__patch__$ = Symbol.for('#__patch__'), $__initor__$ = Symbol.for('#__initor__'), $__inited__$ = Symbol.for('#__inited__'), $__hooks__$ = Symbol.for('#__hooks__');
var $6 = Symbol();
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('../Command'/*$path$*/);
var $2 = require('path'/*$path$*/);
var $3 = require('@formidablejs/console'/*$path$*/);
var $4 = require('child_process'/*$path$*/);
var $5 = requireDefault$__(require('nodemon'/*$path$*/));

class ServeCommand extends $1.Command {
	static [$__init__$](){
		this.prototype[$__initor__$] = $6;
		return this;
	}
	[$__patch__$]($$ = {}){
		var $7;
		super[$__patch__$] && super[$__patch__$]($$);
		($7 = $$[$address$]) !== undefined && (this[$address$] = $7);
		($7 = $$[$fullAddress$]) !== undefined && (this[$fullAddress$] = $7);
		($7 = $$[$command$]) !== undefined && (this[$command$] = $7);
		
	}
	constructor(){
		super(...arguments);
		super[$__init__$] || this[$__init__$]();this[$__initor__$]===$6 && (this[$__hooks__$]&&this[$__hooks__$].inited(this),this[$__inited__$] && this[$__inited__$]());
	}
	[$__init__$]($$ = null,deep = true){
		var $8;
		deep && super[$__init__$] && super[$__init__$](...arguments);
		this[$address$] = $$ ? $$[$address$] : undefined;
		this[$fullAddress$] = $$ ? $$[$fullAddress$] : undefined;
		this[$command$] = ($$ && ($8 = $$[$command$]) !== undefined) ? ($8) : (("./node_modules/.bin/imba" + ((process.platform === 'win32') ? '.cmd' : '') + " server.imba -f"));
		
	}
	get signature(){
		
		return 'serve {?--port} {?--host} {?--dev} {?--addr}';
	}
	
	get description(){
		
		return 'Serve the application on the Imba server';
	}
	
	get props(){
		
		return {
			port: $3.Prop.number().alias('p').default(3000).description('The port to serve the application on'),
			host: $3.Prop.string().alias('h').default('localhost').description('The host address to serve the application on'),
			dev: $3.Prop.boolean().alias('d').description('Serve in dev mode (build, serve and watch)'),
			addr: $3.Prop.boolean().description('Store address in a config file')
		};
	}
	
	get runtime(){
		
		return $2.join(process.cwd(),'node_modules','.bin','imba' + ((process.platform === 'win32') ? '.cmd' : ''));
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
		
		const args = [];
		
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
				
				return $4.spawnSync(sh,[shFlag,this.runtime,...args,'server.imba'],conf);
			};
			
			return $4.spawnSync(this.runtime,[...args,'server.imba'],conf);
		} else {
			
			const server = $5.default({
				ext: 'imba,js,ts',
				exec: this[$command$],
				ignore: ['node_modules','dist','test','tests'],
				stdout: false,
				delay: 5
			});
			
			server.on('stdout',function(e) {
				
				const data = e.toString();
				
				if (self[$address$] == null || self[$address$] == undefined) {
					
					self[$address$] = data.split(' ')[2];
					self[$fullAddress$] = data;
					
					self.message('info','Development Server running…');
					
					self.write(("  Local: <u>" + (self[$address$]) + "</u>"));
					
					self.write("  <fg:yellow>Press Ctrl+C to stop the server</fg:yellow>\n");
				};
				
				if (self[$fullAddress$] != data) {
					
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
