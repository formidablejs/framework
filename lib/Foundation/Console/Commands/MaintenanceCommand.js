Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$consoleφ = require('@formidablejs/console'/*$path$*/);
var _$pathφ = require('path'/*$path$*/);
var _$fsφ = require('fs'/*$path$*/);
var _$fsφ2 = require('fs'/*$path$*/);
var _$fs_extraφ = require('fs-extra'/*$path$*/);
var _$Helpersφ = require('../../../Support/Helpers'/*$path$*/);

class MaintenanceCommand extends _$consoleφ.Command {
	
	
	get file(){
		
		return _$pathφ.join(process.cwd(),'storage','framework','down.json');
	}
	
	down(){
		
		if (_$fsφ.existsSync(this.file)) {
			
			return this.write("<fg:green>Application is already down</fg:green>");
		};
		
		const content = {};
		
		if (!(_$Helpersφ.isEmpty(this.option('message')))) {
			
			content.message = this.option('message');
		};
		
		if (!(_$Helpersφ.isEmpty(this.option('redirect')))) {
			
			content.redirect = this.option('redirect');
		};
		
		if (!(_$Helpersφ.isEmpty(this.option('retry')))) {
			
			content.retry = this.option('retry');
		};
		
		if (!(_$Helpersφ.isEmpty(this.option('refresh')))) {
			
			content.refresh = this.option('refresh');
		};
		
		if (!(_$Helpersφ.isEmpty(this.option('secret')))) {
			
			content.secret = this.option('secret');
		};
		
		if (this.option('status') !== 503) {
			
			content.status = this.option('status');
		};
		
		_$fs_extraφ.outputFileSync(this.file,JSON.stringify(content,null,4),{
			encoding: 'utf8'
		});
		
		if (_$fsφ.existsSync(this.file)) {
			
			return this.write("<fg:green>Application is now in maintenance mode.</fg:green>");
		};
		
		return this.error('Failed to put application in maintenance mode.');
	}
	
	up(){
		
		if (_$fsφ.existsSync(this.file)) {
			
			return this.write("<fg:green>Application is already up.</fg:green>");
		};
		
		_$fsφ2.unlinkSync(this.file);
		
		if (_$fsφ.existsSync(this.file)) {
			
			return this.error("Failed to bring application out of maintenance.");
		};
		
		return this.write("<fg:green>Application is now live.</fg:green>");
	}
};
exports.MaintenanceCommand = MaintenanceCommand;