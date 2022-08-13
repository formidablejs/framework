Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('../Command'/*$path$*/);
var $2 = require('path'/*$path$*/);
var $3 = require('fs'/*$path$*/);
var $4 = require('fs'/*$path$*/);
var $5 = require('fs'/*$path$*/);
var $6 = require('../../../Support/Helpers'/*$path$*/);

class MaintenanceCommand extends $1.Command {
	
	
	get file(){
		
		return $2.join(process.cwd(),'storage','framework','down.json');
	}
	
	down(){
		
		if ($3.existsSync(this.file)) {
			
			return this.info("Application is already down.");
		};
		
		const content = {};
		
		if (!($6.isEmpty(this.option('message')))) {
			
			content.message = this.option('message');
		};
		
		if (!($6.isEmpty(this.option('redirect')))) {
			
			content.redirect = this.option('redirect');
		};
		
		if (!($6.isEmpty(this.option('retry')))) {
			
			content.retry = this.option('retry');
		};
		
		if (!($6.isEmpty(this.option('refresh')))) {
			
			content.refresh = this.option('refresh');
		};
		
		if (!($6.isEmpty(this.option('secret')))) {
			
			content.secret = this.option('secret');
		};
		
		if (this.option('status') !== 503) {
			
			content.status = this.option('status');
		};
		
		$5.outputFileSync(this.file,JSON.stringify(content,null,4),{
			encoding: 'utf8'
		});
		
		if ($3.existsSync(this.file)) {
			
			return this.info("Application is now in maintenance mode.");
		};
		
		return this.error('Failed to put application in maintenance mode.');
	}
	
	up(){
		
		if (!($3.existsSync(this.file))) {
			
			return this.info("Application is already up.");
		};
		
		$4.unlinkSync(this.file);
		
		if ($3.existsSync(this.file)) {
			
			return this.error("Failed to bring application out of maintenance.");
		};
		
		return this.info("Application is now live.");
	}
};
exports.MaintenanceCommand = MaintenanceCommand;
