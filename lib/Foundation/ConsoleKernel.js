function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};;
function iter$__(a){ let v; return a ? ((v=a.toIterable) ? v.call(a) : a) : a; };
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('fs-extra'/*$path$*/);
var $2 = require('./Console/Commands/MakeCrudCommand'/*$path$*/);
var $3 = require('./Console/Commands/SessionPruneExpiredCommand'/*$path$*/);
var $4 = require('./Console/Commands/PackagePublishCommand'/*$path$*/);
var $5 = require('./Console/Commands/ConfigCacheCommand'/*$path$*/);
var $6 = require('./Console/Commands/ConfigClearCommand'/*$path$*/);
var $7 = require('./Console/Commands/DbSeedCommand'/*$path$*/);
var $8 = require('./Console/Commands/DownCommand'/*$path$*/);
var $9 = require('./Console/Commands/EnvironmentCommand'/*$path$*/);
var $10 = require('./Console/Commands/GenerateKeyCommand'/*$path$*/);
var $11 = require('./Console/Commands/MakeCommandCommand'/*$path$*/);
var $12 = require('./Console/Commands/MakeConfigCommand'/*$path$*/);
var $13 = require('./Console/Commands/MakeControllerCommand'/*$path$*/);
var $14 = require('./Console/Commands/MakeExceptionCommand'/*$path$*/);
var $15 = require('./Console/Commands/MakeMailCommand'/*$path$*/);
var $16 = require('./Console/Commands/MakeMiddlewareCommand'/*$path$*/);
var $17 = require('./Console/Commands/MakeMigrationCommand'/*$path$*/);
var $18 = require('./Console/Commands/MakeRequestCommand'/*$path$*/);
var $19 = require('./Console/Commands/MakeResolverCommand'/*$path$*/);
var $20 = require('./Console/Commands/MakeSeederCommand'/*$path$*/);
var $21 = require('./Console/Commands/MigrateDownCommand'/*$path$*/);
var $22 = require('./Console/Commands/MigrateFreshCommand'/*$path$*/);
var $23 = require('./Console/Commands/MigrateLatestCommand'/*$path$*/);
var $24 = require('./Console/Commands/MigrateRollbackCommand'/*$path$*/);
var $25 = require('./Console/Commands/MigrateUpCommand'/*$path$*/);
var $26 = require('./Console/Commands/RouteListCommand'/*$path$*/);
var $27 = require('./Console/Commands/ServeCommand'/*$path$*/);
var $28 = require('./Console/Commands/ShellCommand'/*$path$*/);
var $29 = require('./Console/Commands/UpCommand'/*$path$*/);
var $30 = require('child_process'/*$path$*/);
var $31 = require('path'/*$path$*/);
var $32 = requireDefault$__(require('@formidablejs/console/lib/Output'/*$path$*/));
class ConsoleKernel {
	
	
	get default(){
		
		return [
			// db commands
						$7.DbSeedCommand,
			
			// env command
			$9.EnvironmentCommand,
			
			// key command
			$10.GenerateKeyCommand,
			
			// shell command
			$28.ShellCommand,
			
			// config commands
			$5.ConfigCacheCommand,
			$6.ConfigClearCommand,
			
			// serve command
			$27.ServeCommand,
			
			// session command
			$3.SessionPruneExpiredCommand,
			
			// package commands
			$4.PackagePublishCommand,
			
			// make commands
			$11.MakeCommandCommand,
			$12.MakeConfigCommand,
			$13.MakeControllerCommand,
			$2.MakeCrudCommand,
			$14.MakeExceptionCommand,
			$15.MakeMailCommand,
			$16.MakeMiddlewareCommand,
			$17.MakeMigrationCommand,
			$18.MakeRequestCommand,
			$19.MakeResolverCommand,
			$20.MakeSeederCommand,
			
			// maintenance commands
			$8.DownCommand,
			$29.UpCommand,
			
			// migration commands
			$21.MigrateDownCommand,
			$22.MigrateFreshCommand,
			$23.MigrateLatestCommand,
			$24.MigrateRollbackCommand,
			$25.MigrateUpCommand,
			
			// route commands
			$26.RouteListCommand
		];
	}
	
	get registered(){
		
		return [];
	}
	
	/**
	@param {Application} app
	*/
	registerCommands(app,ctx){
		
		for (let $33 = 0, $34 = iter$__(this.default), $35 = $34.length; $33 < $35; $33++) {
			let command = $34[$33];
			command.ctx = ctx;
			app.register(command);
		};
		
		for (let $36 = 0, $37 = iter$__(this.registered), $38 = $37.length; $36 < $38; $36++) {
			let command = $37[$36];
			command.ctx = ctx;
			app.register(command);
		};
		
		return this.loadEvents(/**@type {Application}*/(app));
	}
	
	/**
	@param {Application} app
	*/
	loadEvents(app){
		var $42, $39;
		
		app.onDefaultCommand(function(e) {
			
			return process.exit();
		});
		
		const appPackage = $31.join(process.cwd(),'package.json');
		
		if (!($1.existsSync(appPackage))) {
			
			return;
		};
		
		const hooks = require(appPackage).hooks || {};
		
		$39 = [];
		for (let $40 = 0, $41 = Object.keys(hooks), $46 = $41.length, event, commands; $40 < $46; $40++){
			event = $41[$40];commands = hooks[event];
			if (!(Array.isArray(commands))) {
				
				commands = [];
			};
			
			$42 = [];
			for (let $43 = 0, $44 = iter$__(commands), $45 = $44.length; $43 < $45; $43++) {
				let command = $44[$43];
				$42.push(app.onEvent(event,function() {
					
					$32.default.write(("\n  <dim>> " + command + "</dim>\n"));
					
					$30.execSync(command,{
						cwd: process.cwd(),
						stdio: 'inherit'
					});
					
					return $32.default.write("<dim>  " + ('-'.repeat((process.stdout.columns / 2) - '  '.length)) + "</dim>");
				}));
			};
			$39.push($42);
		};
		return $39;
	}
};
exports.default = ConsoleKernel;
