function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$Commandφ = require('../Command'/*$path$*/);
var _$pathφ = require('path'/*$path$*/);
var _$inquirerφ = requireDefault$__(require('inquirer'/*$path$*/));
class MigrationCommand extends _$Commandφ.Command {
	
	
	/**
	@param {String} environment
	*/
	async shouldRun(environment){
		
		if (!environment) { return false };
		
		this.info(`**************************************\n*     Application In Production!     *\n**************************************`);
		
		const res = await _$inquirerφ.default.prompt([{
			name: 'run',
			message: 'Do you really wish to run this command',
			type: 'confirm'
		}]);
		
		if (!res.run) {
			
			this.info("Command Canceled!");
		};
		
		return res.run;
	}
	
	/**
	@param {String} action
	*/
	async call(action){
		var self = this;
		
		const environment = this.app.config.get('app.env','development');
		
		if (environment.toLowerCase().trim() === 'production' && (this.globalOptions ? this.globalOptions.noInteraction : false) !== true) {
			
			const runCommand = await this.shouldRun(environment);
			
			if (!runCommand) { return };
		};
		
		this.info(("Using environment: " + environment));
		
		let results;
		
		if (action === 'up' || action === 'down') {
			
			results = await this.app.migration().migrate(this.option('migration',(action === 'up') ? true : false));
		} else if (action === 'latest') {
			
			results = await this.app.migration().latest();
		} else if (action === 'rollback') {
			
			results = await this.app.migration().rollback(this.option('all',false));
		} else if (action === 'fresh') {
			
			results = await this.app.migration().fresh(true);
		};
		
		if (results === false) {
			
			return this.error('Migration failed');
		};
		
		if (results[1].length > 0) {
			
			results[1].forEach(function(migration) { return self.info(("" + ((action === 'rollback') ? 'Rollback' : 'Migrate') + ": " + migration)); });
			
			return;
		};
		
		return self.write("<fg:red>No migration to run</fg:red>");
	}
};
exports.MigrationCommand = MigrationCommand;
