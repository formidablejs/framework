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
	@param {String} action
	*/
	async call(action){
		var self = this;
		
		await this.shouldRun();
		
		this.usingEnv();
		
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
		
		self.write("<fg:red>No migration to run</fg:red>");
		
		return self.exit();
	}
};
exports.MigrationCommand = MigrationCommand;
