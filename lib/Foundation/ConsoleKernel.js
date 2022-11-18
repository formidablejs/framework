function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};;
function iter$__(a){ let v; return a ? ((v=a.toIterable) ? v.call(a) : a) : a; };
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('fs-extra'/*$path$*/);
var $2 = require('./Console/Commands/ConfigCacheCommand'/*$path$*/);
var $3 = require('./Console/Commands/ConfigClearCommand'/*$path$*/);
var $4 = require('./Console/Commands/DbSeedCommand'/*$path$*/);
var $5 = require('./Console/Commands/DownCommand'/*$path$*/);
var $6 = require('./Console/Commands/EnvironmentCommand'/*$path$*/);
var $7 = require('./Console/Commands/GenerateKeyCommand'/*$path$*/);
var $8 = require('./Console/Commands/InspireCommand'/*$path$*/);
var $9 = require('./Console/Commands/MakeCommandCommand'/*$path$*/);
var $10 = require('./Console/Commands/MakeConfigCommand'/*$path$*/);
var $11 = require('./Console/Commands/MakeControllerCommand'/*$path$*/);
var $12 = require('./Console/Commands/MakeCrudCommand'/*$path$*/);
var $13 = require('./Console/Commands/MakeExceptionCommand'/*$path$*/);
var $14 = require('./Console/Commands/MakeMailCommand'/*$path$*/);
var $15 = require('./Console/Commands/MakeMiddlewareCommand'/*$path$*/);
var $16 = require('./Console/Commands/MakeMigrationCommand'/*$path$*/);
var $17 = require('./Console/Commands/MakeRepositoryCommand'/*$path$*/);
var $18 = require('./Console/Commands/MakeRequestCommand'/*$path$*/);
var $19 = require('./Console/Commands/MakeResolverCommand'/*$path$*/);
var $20 = require('./Console/Commands/MakeSeederCommand'/*$path$*/);
var $21 = require('./Console/Commands/MakeTagCommand'/*$path$*/);
var $22 = require('./Console/Commands/MakeViewCommand'/*$path$*/);
var $23 = require('./Console/Commands/MigrateDownCommand'/*$path$*/);
var $24 = require('./Console/Commands/MigrateFreshCommand'/*$path$*/);
var $25 = require('./Console/Commands/MigrateLatestCommand'/*$path$*/);
var $26 = require('./Console/Commands/MigrateRollbackCommand'/*$path$*/);
var $27 = require('./Console/Commands/MigrateUpCommand'/*$path$*/);
var $28 = require('./Console/Commands/PackagePublishCommand'/*$path$*/);
var $29 = require('./Console/Commands/RouteListCommand'/*$path$*/);
var $30 = require('./Console/Commands/ServeCommand'/*$path$*/);
var $31 = require('./Console/Commands/SessionPruneExpiredCommand'/*$path$*/);
var $32 = require('./Console/Commands/ShellCommand'/*$path$*/);
var $33 = require('./Console/Commands/UpCommand'/*$path$*/);
var $34 = require('child_process'/*$path$*/);
var $35 = require('path'/*$path$*/);
var $36 = requireDefault$__(require('@formidablejs/console/lib/Output'/*$path$*/));
class ConsoleKernel {
	
	
	get default(){
		
		return [
			// db commands
						$4.DbSeedCommand,
			
			// env command
			$6.EnvironmentCommand,
			
			// key command
			$7.GenerateKeyCommand,
			
			// shell command
			$32.ShellCommand,
			
			// config commands
			$2.ConfigCacheCommand,
			$3.ConfigClearCommand,
			
			// serve command
			$30.ServeCommand,
			
			// session command
			$31.SessionPruneExpiredCommand,
			
			// package commands
			$28.PackagePublishCommand,
			
			// make commands
			$9.MakeCommandCommand,
			$10.MakeConfigCommand,
			$11.MakeControllerCommand,
			$12.MakeCrudCommand,
			$13.MakeExceptionCommand,
			$14.MakeMailCommand,
			$15.MakeMiddlewareCommand,
			$16.MakeMigrationCommand,
			$17.MakeRepositoryCommand,
			$18.MakeRequestCommand,
			$19.MakeResolverCommand,
			$20.MakeSeederCommand,
			$21.MakeTagCommand,
			$22.MakeViewCommand,
			
			// maintenance commands
			$5.DownCommand,
			$33.UpCommand,
			
			// migration commands
			$23.MigrateDownCommand,
			$24.MigrateFreshCommand,
			$25.MigrateLatestCommand,
			$26.MigrateRollbackCommand,
			$27.MigrateUpCommand,
			
			// route commands
			$29.RouteListCommand,
			
			// other
			$8.InspireCommand
		];
	}
	
	get registered(){
		
		return [];
	}
	
	/**
	@param {Application} app
	*/
	registerCommands(app,ctx){
		
		for (let $37 = 0, $38 = iter$__(this.default), $39 = $38.length; $37 < $39; $37++) {
			let command = $38[$37];
			command.ctx = ctx;
			app.register(command);
		};
		
		for (let $40 = 0, $41 = iter$__(this.registered), $42 = $41.length; $40 < $42; $40++) {
			let command = $41[$40];
			command.ctx = ctx;
			app.register(command);
		};
		
		return this.loadEvents(/**@type {Application}*/(app));
	}
	
	/**
	@param {Application} app
	*/
	loadEvents(app){
		var $46, $43;
		
		app.onDefaultCommand(function(e) {
			
			return process.exit();
		});
		
		const appPackage = $35.join(process.cwd(),'package.json');
		
		if (!($1.existsSync(appPackage))) {
			
			return;
		};
		
		const hooks = require(appPackage).hooks || {};
		
		$43 = [];
		for (let $44 = 0, $45 = Object.keys(hooks), $50 = $45.length, event, commands; $44 < $50; $44++){
			event = $45[$44];commands = hooks[event];
			if (!(Array.isArray(commands))) {
				
				commands = [];
			};
			
			$46 = [];
			for (let $47 = 0, $48 = iter$__(commands), $49 = $48.length; $47 < $49; $47++) {
				let command = $48[$47];
				$46.push(app.onEvent(event,function() {
					
					$36.default.write(("\n  <dim>> " + command + "</dim>\n"));
					
					$34.execSync(command,{
						cwd: process.cwd(),
						stdio: 'inherit'
					});
					
					const repeat = (process.stdout.columns <= 200) ? process.stdout.columns : ((process.stdout.columns / 2));
					
					return $36.default.write("<dim>  " + ('-'.repeat(repeat - '  '.length)) + "</dim>");
				}));
			};
			$43.push($46);
		};
		return $43;
	}
};
exports.default = ConsoleKernel;
