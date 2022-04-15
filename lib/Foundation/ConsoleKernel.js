function iter$__(a){ let v; return a ? ((v=a.toIterable) ? v.call(a) : a) : a; };
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('./Console/Commands/PackagePublishCommand'/*$path$*/);
var $2 = require('./Console/Commands/ConfigCacheCommand'/*$path$*/);
var $3 = require('./Console/Commands/ConfigClearCommand'/*$path$*/);
var $4 = require('./Console/Commands/DbSeedCommand'/*$path$*/);
var $5 = require('./Console/Commands/DownCommand'/*$path$*/);
var $6 = require('./Console/Commands/EnvironmentCommand'/*$path$*/);
var $7 = require('./Console/Commands/GenerateKeyCommand'/*$path$*/);
var $8 = require('./Console/Commands/MakeCommandCommand'/*$path$*/);
var $9 = require('./Console/Commands/MakeConfigCommand'/*$path$*/);
var $10 = require('./Console/Commands/MakeControllerCommand'/*$path$*/);
var $11 = require('./Console/Commands/MakeExceptionCommand'/*$path$*/);
var $12 = require('./Console/Commands/MakeMailCommand'/*$path$*/);
var $13 = require('./Console/Commands/MakeMiddlewareCommand'/*$path$*/);
var $14 = require('./Console/Commands/MakeMigrationCommand'/*$path$*/);
var $15 = require('./Console/Commands/MakeModelCommand'/*$path$*/);
var $16 = require('./Console/Commands/MakeRequestCommand'/*$path$*/);
var $17 = require('./Console/Commands/MakeResolverCommand'/*$path$*/);
var $18 = require('./Console/Commands/MakeSeederCommand'/*$path$*/);
var $19 = require('./Console/Commands/MigrateDownCommand'/*$path$*/);
var $20 = require('./Console/Commands/MigrateFreshCommand'/*$path$*/);
var $21 = require('./Console/Commands/MigrateLatestCommand'/*$path$*/);
var $22 = require('./Console/Commands/MigrateRollbackCommand'/*$path$*/);
var $23 = require('./Console/Commands/MigrateUpCommand'/*$path$*/);
var $24 = require('./Console/Commands/RouteListCommand'/*$path$*/);
var $25 = require('./Console/Commands/ServeCommand'/*$path$*/);
var $26 = require('./Console/Commands/ShellCommand'/*$path$*/);
var $27 = require('./Console/Commands/UpCommand'/*$path$*/);
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
			$26.ShellCommand,
			
			// config commands
			$2.ConfigCacheCommand,
			$3.ConfigClearCommand,
			
			// serve command
			$25.ServeCommand,
			
			// package commands
			$1.PackagePublishCommand,
			
			// make commands
			$8.MakeCommandCommand,
			$9.MakeConfigCommand,
			$10.MakeControllerCommand,
			$11.MakeExceptionCommand,
			$12.MakeMailCommand,
			$13.MakeMiddlewareCommand,
			$14.MakeMigrationCommand,
			$15.MakeModelCommand,
			$16.MakeRequestCommand,
			$17.MakeResolverCommand,
			$18.MakeSeederCommand,
			
			// maintenance commands
			$5.DownCommand,
			$27.UpCommand,
			
			// migration commands
			$19.MigrateDownCommand,
			$20.MigrateFreshCommand,
			$21.MigrateLatestCommand,
			$22.MigrateRollbackCommand,
			$23.MigrateUpCommand,
			
			// route commands
			$24.RouteListCommand
		];
	}
	
	get registered(){
		
		return [];
	}
	
	/**
	@param {Application} app
	*/
	registerCommands(app,ctx){
		var $31;
		
		for (let $28 = 0, $29 = iter$__(this.default), $30 = $29.length; $28 < $30; $28++) {
			let command = $29[$28];
			command.ctx = ctx;
			app.register(command);
		};
		
		$31 = [];
		for (let $32 = 0, $33 = iter$__(this.registered), $34 = $33.length; $32 < $34; $32++) {
			let command = $33[$32];
			command.ctx = ctx;
			$31.push(app.register(command));
		};
		return $31;
	}
};
exports.default = ConsoleKernel;
