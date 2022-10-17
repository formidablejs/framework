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
var $17 = require('./Console/Commands/MakeRequestCommand'/*$path$*/);
var $18 = require('./Console/Commands/MakeResolverCommand'/*$path$*/);
var $19 = require('./Console/Commands/MakeSeederCommand'/*$path$*/);
var $20 = require('./Console/Commands/MakeViewCommand'/*$path$*/);
var $21 = require('./Console/Commands/MigrateDownCommand'/*$path$*/);
var $22 = require('./Console/Commands/MigrateFreshCommand'/*$path$*/);
var $23 = require('./Console/Commands/MigrateLatestCommand'/*$path$*/);
var $24 = require('./Console/Commands/MigrateRollbackCommand'/*$path$*/);
var $25 = require('./Console/Commands/MigrateUpCommand'/*$path$*/);
var $26 = require('./Console/Commands/PackagePublishCommand'/*$path$*/);
var $27 = require('./Console/Commands/RouteListCommand'/*$path$*/);
var $28 = require('./Console/Commands/ServeCommand'/*$path$*/);
var $29 = require('./Console/Commands/SessionPruneExpiredCommand'/*$path$*/);
var $30 = require('./Console/Commands/ShellCommand'/*$path$*/);
var $31 = require('./Console/Commands/UpCommand'/*$path$*/);
var $32 = require('child_process'/*$path$*/);
var $33 = require('path'/*$path$*/);
var $34 = requireDefault$__(require('@formidablejs/console/lib/Output'/*$path$*/));
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
			$30.ShellCommand,
			
			// config commands
			$2.ConfigCacheCommand,
			$3.ConfigClearCommand,
			
			// serve command
			$28.ServeCommand,
			
			// session command
			$29.SessionPruneExpiredCommand,
			
			// package commands
			$26.PackagePublishCommand,
			
			// make commands
			$9.MakeCommandCommand,
			$10.MakeConfigCommand,
			$11.MakeControllerCommand,
			$12.MakeCrudCommand,
			$13.MakeExceptionCommand,
			$14.MakeMailCommand,
			$15.MakeMiddlewareCommand,
			$16.MakeMigrationCommand,
			$17.MakeRequestCommand,
			$18.MakeResolverCommand,
			$19.MakeSeederCommand,
			$20.MakeViewCommand,
			
			// maintenance commands
			$5.DownCommand,
			$31.UpCommand,
			
			// migration commands
			$21.MigrateDownCommand,
			$22.MigrateFreshCommand,
			$23.MigrateLatestCommand,
			$24.MigrateRollbackCommand,
			$25.MigrateUpCommand,
			
			// route commands
			$27.RouteListCommand,
			
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
		
		for (let $35 = 0, $36 = iter$__(this.default), $37 = $36.length; $35 < $37; $35++) {
			let command = $36[$35];
			command.ctx = ctx;
			app.register(command);
		};
		
		for (let $38 = 0, $39 = iter$__(this.registered), $40 = $39.length; $38 < $40; $38++) {
			let command = $39[$38];
			command.ctx = ctx;
			app.register(command);
		};
		
		return this.loadEvents(/**@type {Application}*/(app));
	}
	
	/**
	@param {Application} app
	*/
	loadEvents(app){
		var $44, $41;
		
		app.onDefaultCommand(function(e) {
			
			return process.exit();
		});
		
		const appPackage = $33.join(process.cwd(),'package.json');
		
		if (!($1.existsSync(appPackage))) {
			
			return;
		};
		
		const hooks = require(appPackage).hooks || {};
		
		$41 = [];
		for (let $42 = 0, $43 = Object.keys(hooks), $48 = $43.length, event, commands; $42 < $48; $42++){
			event = $43[$42];commands = hooks[event];
			if (!(Array.isArray(commands))) {
				
				commands = [];
			};
			
			$44 = [];
			for (let $45 = 0, $46 = iter$__(commands), $47 = $46.length; $45 < $47; $45++) {
				let command = $46[$45];
				$44.push(app.onEvent(event,function() {
					
					$34.default.write(("\n  <dim>> " + command + "</dim>\n"));
					
					$32.execSync(command,{
						cwd: process.cwd(),
						stdio: 'inherit'
					});
					
					const repeat = (process.stdout.columns <= 85) ? process.stdout.columns : ((process.stdout.columns / 2));
					
					return $34.default.write("<dim>  " + ('-'.repeat(repeat - '  '.length)) + "</dim>");
				}));
			};
			$41.push($44);
		};
		return $41;
	}
};
exports.default = ConsoleKernel;
