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
		
		for (let $32 = 0, $33 = iter$__(this.default), $34 = $33.length; $32 < $34; $32++) {
			let command = $33[$32];
			command.ctx = ctx;
			app.register(command);
		};
		
		for (let $35 = 0, $36 = iter$__(this.registered), $37 = $36.length; $35 < $37; $35++) {
			let command = $36[$35];
			command.ctx = ctx;
			app.register(command);
		};
		
		return this.loadEvents(/**@type {Application}*/(app));
	}
	
	/**
	@param {Application} app
	*/
	loadEvents(app){
		var $41, $38;
		
		app.onDefaultCommand(function(e) {
			
			return process.exit();
		});
		
		const appPackage = $31.join(process.cwd(),'package.json');
		
		if (!($1.existsSync(appPackage))) {
			
			return;
		};
		
		const hooks = require(appPackage).hooks || {};
		
		$38 = [];
		for (let $39 = 0, $40 = Object.keys(hooks), $45 = $40.length, event, commands; $39 < $45; $39++){
			event = $40[$39];commands = hooks[event];
			if (!(Array.isArray(commands))) {
				
				commands = [];
			};
			
			$41 = [];
			for (let $42 = 0, $43 = iter$__(commands), $44 = $43.length; $42 < $44; $42++) {
				let command = $43[$42];
				$41.push(app.onEvent(event,function() {
					
					return $30.execSync(command,{
						cwd: process.cwd(),
						stdio: 'inherit'
					});
				}));
			};
			$38.push($41);
		};
		return $38;
	}
};
exports.default = ConsoleKernel;
