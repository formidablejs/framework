Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$consoleφ = require('@formidablejs/console'/*$path$*/);
var _$Commandφ = require('../Command'/*$path$*/);
var _$child_processφ = require('child_process'/*$path$*/);
var _$pathφ = require('path'/*$path$*/);

class ServeCommand extends _$Commandφ.Command {
	
	
	get signature(){
		
		return 'serve {?--port} {?--host} {?--dev}';
	}
	
	get description(){
		
		return 'Serve the application on the Imba server';
	}
	
	get props(){
		
		return {
			port: _$consoleφ.Prop.number().alias('p').default(3000).description('The port to serve the application on'),
			host: _$consoleφ.Prop.string().alias('h').default('localhost').description('The host address to serve the application on'),
			dev: _$consoleφ.Prop.boolean().alias('d').description('Serve in dev mode (build, serve and watch)')
		};
		
	}
	get runtime(){
		
		return _$pathφ.join(process.cwd(),'node_modules','.bin','imbar');
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
		
		return _$child_processφ.spawnSync(this.runtime,[...args,'server.imba'],{
			stdio: 'inherit',
			cwd: process.cwd()
		});
	}
	
	setEnvVars(){
		
		process.env.FORMIDABLE_PORT = this.option('port',this.fallbackPort);
		return process.env.FORMIDABLE_HOST = this.option('host',this.fallbackHost);
	}
};
exports.ServeCommand = ServeCommand;
