Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('../Command'/*$path$*/);
var $2 = require('path'/*$path$*/);
var $3 = require('@formidablejs/console'/*$path$*/);
var $4 = require('child_process'/*$path$*/);

class ServeCommand extends $1.Command {
	
	
	get signature(){
		
		return 'serve {?--port} {?--host} {?--dev} {?--addr}';
	}
	
	get description(){
		
		return 'Serve the application on the Imba server';
	}
	
	get props(){
		
		return {
			port: $3.Prop.string().alias('p').default(3000).description('The port to serve the application on'),
			host: $3.Prop.string().alias('h').default('localhost').description('The host address to serve the application on'),
			dev: $3.Prop.boolean().alias('d').description('Serve in dev mode (build, serve and watch)'),
			addr: $3.Prop.boolean().description('Store address in a config file')
		};
		
	}
	get runtime(){
		
		return $2.join(process.cwd(),'node_modules','.bin','imbar' + ((process.platform === 'win32') ? '.cmd' : ''));
	}
	
	get fallbackPort(){
		
		return (process.env.PORT !== undefined && process.env.PORT !== null) ? process.env.PORT : undefined;
	}
	
	get fallbackHost(){
		
		return (process.env.HOST !== undefined && process.env.HOST !== null) ? process.env.HOST : undefined;
	}
	
	handle(){
		
		if (isNaN(this.option('port'))) { return this.error('Port must be a valid number.') };
		
		this.setEnvVars();
		
		const args = [];
		
		if (this.option('dev',false)) { args.push('--watch') };
		
		if (this.option('addr')) { process.env.FORMIDABLE_ADDRESS_SET = '1' };
		
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
	}
	
	setEnvVars(){
		
		process.env.FORMIDABLE_PORT = this.option('port',this.fallbackPort);
		return process.env.FORMIDABLE_HOST = this.option('host',this.fallbackHost);
	}
};
exports.ServeCommand = ServeCommand;
