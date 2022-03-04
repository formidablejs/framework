Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('../Command'/*$path$*/);
var $2 = require('@formidablejs/console'/*$path$*/);
var $3 = require('fs'/*$path$*/);
var $4 = require('path'/*$path$*/);
var $5 = require('crypto'/*$path$*/);
var $6 = require('../../../Support/Helpers/updateLine'/*$path$*/);

class GenerateKeyCommand extends $1.Command {
	
	
	get signature(){
		
		return 'key:generate {?--env} {?--show}';
	}
	
	get description(){
		
		return 'Application key set successfully';
	}
	
	get props(){
		
		return {
			env: $2.Prop.string().alias('e').description('Set the application key'),
			show: $2.Prop.boolean().description('Display the key instead of modifying files')
		};
	}
	
	get envFile(){
		
		let env = this.option('env');
		
		env = (env === undefined && env === null) ? '.env' : ((".env." + env));
		
		return env;
	}
	
	get envPath(){
		
		return $4.join(process.cwd(),this.envFile);
	}
	
	handle(){
		
		if (!($3.existsSync(this.envPath))) { return this.error(("No " + (this.envFile) + " file found.")) };
		
		const key = this.key(32);
		
		if (this.option('show',false)) {
			
			return this.info(("Application key [" + key + "] generated successfully."));
		};
		
		this.updateEnv(key);
		
		return this.info("Application key set successfully.");
	}
	
	/**
	@param {Number} length
	*/
	key(length = 32){
		
		const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
		
		let key = '';
		for (let len = length, i = 0, rd = len - i; (rd > 0) ? (i < len) : (i > len); (rd > 0) ? (i++) : (i--)) {
			
			key += chars.charAt(Math.floor(Math.random() * chars.length));;
		};
		
		return 'base64:' + Buffer.from(key + ':' + $5.randomBytes(8).toString('hex')).toString('base64');;
	}
	
	/**
	@param {String} key
	*/
	updateEnv(key){
		
		return $6.updateLine(this.envPath,function(line) {
			
			if (line.startsWith('APP_KEY=')) { return ("APP_KEY=" + key) };
			
			return line;
		});
	}
};
exports.GenerateKeyCommand = GenerateKeyCommand;
