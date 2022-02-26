function iter$__(a){ let v; return a ? ((v=a.toIterable) ? v.call(a) : a) : []; };
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$DownCommandφ = require('./Console/Commands/DownCommand'/*$path$*/);
var _$EnvironmentCommandφ = require('./Console/Commands/EnvironmentCommand'/*$path$*/);
var _$GenerateKeyCommandφ = require('./Console/Commands/GenerateKeyCommand'/*$path$*/);
var _$MakeConfigCommandφ = require('./Console/Commands/MakeConfigCommand'/*$path$*/);
var _$MakeControllerCommandφ = require('./Console/Commands/MakeControllerCommand'/*$path$*/);
var _$MakeExceptionCommandφ = require('./Console/Commands/MakeExceptionCommand'/*$path$*/);
var _$MakeMailCommandφ = require('./Console/Commands/MakeMailCommand'/*$path$*/);
var _$MakeMiddlewareCommandφ = require('./Console/Commands/MakeMiddlewareCommand'/*$path$*/);
var _$MakeMigrationCommandφ = require('./Console/Commands/MakeMigrationCommand'/*$path$*/);
var _$MakeModelCommandφ = require('./Console/Commands/MakeModelCommand'/*$path$*/);
var _$MakeRequestCommandφ = require('./Console/Commands/MakeRequestCommand'/*$path$*/);
var _$MakeResolverCommandφ = require('./Console/Commands/MakeResolverCommand'/*$path$*/);
var _$MakeSeederCommandφ = require('./Console/Commands/MakeSeederCommand'/*$path$*/);
var _$MigrateDownCommandφ = require('./Console/Commands/MigrateDownCommand'/*$path$*/);
var _$MigrateFreshCommandφ = require('./Console/Commands/MigrateFreshCommand'/*$path$*/);
var _$MigrateLatestCommandφ = require('./Console/Commands/MigrateLatestCommand'/*$path$*/);
var _$MigrateRollbackCommandφ = require('./Console/Commands/MigrateRollbackCommand'/*$path$*/);
var _$MigrateUpCommandφ = require('./Console/Commands/MigrateUpCommand'/*$path$*/);
var _$RouteListCommandφ = require('./Console/Commands/RouteListCommand'/*$path$*/);
var _$UpCommandφ = require('./Console/Commands/UpCommand'/*$path$*/);
class ConsoleKernel {
	
	
	get default(){
		
		return [
			// env command
						_$EnvironmentCommandφ.EnvironmentCommand,
			
			// key command
			_$GenerateKeyCommandφ.GenerateKeyCommand,
			
			// make commands
			_$MakeConfigCommandφ.MakeConfigCommand,
			_$MakeControllerCommandφ.MakeControllerCommand,
			_$MakeExceptionCommandφ.MakeExceptionCommand,
			_$MakeMailCommandφ.MakeMailCommand,
			_$MakeMiddlewareCommandφ.MakeMiddlewareCommand,
			_$MakeMigrationCommandφ.MakeMigrationCommand,
			_$MakeModelCommandφ.MakeModelCommand,
			_$MakeRequestCommandφ.MakeRequestCommand,
			_$MakeResolverCommandφ.MakeResolverCommand,
			_$MakeSeederCommandφ.MakeSeederCommand,
			
			// maintenance commands
			_$DownCommandφ.DownCommand,
			_$UpCommandφ.UpCommand,
			
			// migration commands
			_$MigrateDownCommandφ.MigrateDownCommand,
			_$MigrateFreshCommandφ.MigrateFreshCommand,
			_$MigrateLatestCommandφ.MigrateLatestCommand,
			_$MigrateRollbackCommandφ.MigrateRollbackCommand,
			_$MigrateUpCommandφ.MigrateUpCommand,
			
			// route commands
			_$RouteListCommandφ.RouteListCommand
		];
	}
	
	get registered(){
		
		return [];
	}
	
	/**
	@param {Application} app
	*/
	registerCommands(app,ctx){
		var resφ;
		
		for (let iφ = 0, itemsφ = iter$__(this.default), lenφ = itemsφ.length; iφ < lenφ; iφ++) {
			let command = itemsφ[iφ];
			command.ctx = ctx;
			app.register(command);
		};
		
		resφ = [];
		for (let iφ2 = 0, itemsφ2 = iter$__(this.registered), lenφ2 = itemsφ2.length; iφ2 < lenφ2; iφ2++) {
			let command = itemsφ2[iφ2];
			command.ctx = ctx;
			resφ.push(app.register(command));
		};
		return resφ;
	}
};
exports.default = ConsoleKernel;
