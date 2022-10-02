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
var $21 = require('./Console/Commands/MakeViewCommand'/*$path$*/);
var $22 = require('./Console/Commands/MigrateDownCommand'/*$path$*/);
var $23 = require('./Console/Commands/MigrateFreshCommand'/*$path$*/);
var $24 = require('./Console/Commands/MigrateLatestCommand'/*$path$*/);
var $25 = require('./Console/Commands/MigrateRollbackCommand'/*$path$*/);
var $26 = require('./Console/Commands/MigrateUpCommand'/*$path$*/);
var $27 = require('./Console/Commands/RouteListCommand'/*$path$*/);
var $28 = require('./Console/Commands/ServeCommand'/*$path$*/);
var $29 = require('./Console/Commands/ShellCommand'/*$path$*/);
var $30 = require('./Console/Commands/UpCommand'/*$path$*/);
var $31 = require('child_process'/*$path$*/);
var $32 = require('path'/*$path$*/);
var $33 = requireDefault$__(require('@formidablejs/console/lib/Output'/*$path$*/));
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
			$29.ShellCommand,
			
			// config commands
			$5.ConfigCacheCommand,
			$6.ConfigClearCommand,
			
			// serve command
			$28.ServeCommand,
			
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
			$21.MakeViewCommand,
			
			// maintenance commands
			$8.DownCommand,
			$30.UpCommand,
			
			// migration commands
			$22.MigrateDownCommand,
			$23.MigrateFreshCommand,
			$24.MigrateLatestCommand,
			$25.MigrateRollbackCommand,
			$26.MigrateUpCommand,
			
			// route commands
			$27.RouteListCommand
		];
	}
	
	get registered(){
		
		return [];
	}
	
	/**
	@param {Application} app
	*/
	registerCommands(app,ctx){
		
		for (let $34 = 0, $35 = iter$__(this.default), $36 = $35.length; $34 < $36; $34++) {
			let command = $35[$34];
			command.ctx = ctx;
			app.register(command);
		};
		
		for (let $37 = 0, $38 = iter$__(this.registered), $39 = $38.length; $37 < $39; $37++) {
			let command = $38[$37];
			command.ctx = ctx;
			app.register(command);
		};
		
		return this.loadEvents(/**@type {Application}*/(app));
	}
	
	/**
	@param {Application} app
	*/
	loadEvents(app){
		var $43, $40;
		
		app.onDefaultCommand(function(e) {
			
			return process.exit();
		});
		
		const appPackage = $32.join(process.cwd(),'package.json');
		
		if (!($1.existsSync(appPackage))) {
			
			return;
		};
		
		const hooks = require(appPackage).hooks || {};
		
		$40 = [];
		for (let $41 = 0, $42 = Object.keys(hooks), $47 = $42.length, event, commands; $41 < $47; $41++){
			event = $42[$41];commands = hooks[event];
			if (!(Array.isArray(commands))) {
				
				commands = [];
			};
			
			$43 = [];
			for (let $44 = 0, $45 = iter$__(commands), $46 = $45.length; $44 < $46; $44++) {
				let command = $45[$44];
				$43.push(app.onEvent(event,function() {
					
					$33.default.write(("\n  <dim>> " + command + "</dim>\n"));
					
					$31.execSync(command,{
						cwd: process.cwd(),
						stdio: 'inherit'
					});
					
					const repeat = (process.stdout.columns <= 85) ? process.stdout.columns : ((process.stdout.columns / 2));
					
					return $33.default.write("<dim>  " + ('-'.repeat(repeat - '  '.length)) + "</dim>");
				}));
			};
			$40.push($43);
		};
		return $40;
	}
};
exports.default = ConsoleKernel;
