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
var $21 = require('./Console/Commands/MakeViewCommand'/*$path$*/);
var $22 = require('./Console/Commands/MigrateDownCommand'/*$path$*/);
var $23 = require('./Console/Commands/MigrateFreshCommand'/*$path$*/);
var $24 = require('./Console/Commands/MigrateLatestCommand'/*$path$*/);
var $25 = require('./Console/Commands/MigrateRollbackCommand'/*$path$*/);
var $26 = require('./Console/Commands/MigrateUpCommand'/*$path$*/);
var $27 = require('./Console/Commands/PackagePublishCommand'/*$path$*/);
var $28 = require('./Console/Commands/RouteListCommand'/*$path$*/);
var $29 = require('./Console/Commands/ServeCommand'/*$path$*/);
var $30 = require('./Console/Commands/SessionPruneExpiredCommand'/*$path$*/);
var $31 = require('./Console/Commands/ShellCommand'/*$path$*/);
var $32 = require('./Console/Commands/UpCommand'/*$path$*/);
var $33 = require('child_process'/*$path$*/);
var $34 = require('path'/*$path$*/);
var $35 = requireDefault$__(require('@formidablejs/console/lib/Output'/*$path$*/));
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
			$31.ShellCommand,
			
			// config commands
			$2.ConfigCacheCommand,
			$3.ConfigClearCommand,
			
			// serve command
			$29.ServeCommand,
			
			// session command
			$30.SessionPruneExpiredCommand,
			
			// package commands
			$27.PackagePublishCommand,
			
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
			$21.MakeViewCommand,
			
			// maintenance commands
			$5.DownCommand,
			$32.UpCommand,
			
			// migration commands
			$22.MigrateDownCommand,
			$23.MigrateFreshCommand,
			$24.MigrateLatestCommand,
			$25.MigrateRollbackCommand,
			$26.MigrateUpCommand,
			
			// route commands
			$28.RouteListCommand,
			
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
		
		for (let $36 = 0, $37 = iter$__(this.default), $38 = $37.length; $36 < $38; $36++) {
			let command = $37[$36];
			command.ctx = ctx;
			app.register(command);
		};
		
		for (let $39 = 0, $40 = iter$__(this.registered), $41 = $40.length; $39 < $41; $39++) {
			let command = $40[$39];
			command.ctx = ctx;
			app.register(command);
		};
		
		return this.loadEvents(/**@type {Application}*/(app));
	}
	
	/**
	@param {Application} app
	*/
	loadEvents(app){
		var $45, $42;
		
		app.onDefaultCommand(function(e) {
			
			return process.exit();
		});
		
		const appPackage = $34.join(process.cwd(),'package.json');
		
		if (!($1.existsSync(appPackage))) {
			
			return;
		};
		
		const hooks = require(appPackage).hooks || {};
		
		$42 = [];
		for (let $43 = 0, $44 = Object.keys(hooks), $49 = $44.length, event, commands; $43 < $49; $43++){
			event = $44[$43];commands = hooks[event];
			if (!(Array.isArray(commands))) {
				
				commands = [];
			};
			
			$45 = [];
			for (let $46 = 0, $47 = iter$__(commands), $48 = $47.length; $46 < $48; $46++) {
				let command = $47[$46];
				$45.push(app.onEvent(event,function() {
					
					$35.default.write(("\n  <dim>> " + command + "</dim>\n"));
					
					$33.execSync(command,{
						cwd: process.cwd(),
						stdio: 'inherit'
					});
					
					const repeat = (process.stdout.columns <= 85) ? process.stdout.columns : ((process.stdout.columns / 2));
					
					return $35.default.write("<dim>  " + ('-'.repeat(repeat - '  '.length)) + "</dim>");
				}));
			};
			$42.push($45);
		};
		return $42;
	}
};
exports.default = ConsoleKernel;
