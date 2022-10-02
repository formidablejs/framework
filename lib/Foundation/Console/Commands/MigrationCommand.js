Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('../Command'/*$path$*/);
var $2 = require('path'/*$path$*/);
class MigrationCommand extends $1.Command {
	
	
	/**
	@param {string} action
	*/
	async call(action){
		var self = this;
		
		await this.shouldRun();
		
		this.usingEnv();
		
		let results;
		
		if (action === 'up' || action === 'down') {
			
			results = await this.app.migration().migrate(this.option('migration'),(action === 'up') ? true : false);
		} else if (action === 'latest') {
			
			results = await this.app.migration().latest();
		} else if (action === 'rollback') {
			
			results = await this.app.migration().rollback(this.option('all',false));
		} else if (action === 'fresh') {
			
			results = await this.app.migration().fresh();
		};
		
		if (results === false) {
			
			this.message('error','Migration failed');
			
			this.exit();
			
			return;
		};
		
		if (results[1].length > 0) {
			
			results[1].forEach(function(migration) { return self.write(("<fg:green>" + ((action === 'rollback') ? 'Rollback' : 'Migrate') + ":</fg:green> " + migration)); });
			
			this.exit();
			
			return;
		};
		
		this.write("<fg:red>No migration to run</fg:red>");
		
		return this.exit();
	}
};
exports.MigrationCommand = MigrationCommand;
