Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$Commandφ = require('../Command'/*$path$*/);
var _$consoleφ = require('@formidablejs/console'/*$path$*/);
var _$fsφ = require('fs'/*$path$*/);
var _$pathφ = require('path'/*$path$*/);
var _$cryptoφ = require('crypto'/*$path$*/);
var _$updateLineφ = require('../../../Support/Helpers/updateLine'/*$path$*/);

class GenerateKeyCommand extends _$Commandφ.Command {
	
	
	get signature(){
		
		return 'key:generate {?--env} {?--show}';
	}
	
	get props(){
		
		return {
			env: _$consoleφ.Prop.string().alias('e').description('Set the application key'),
			show: _$consoleφ.Prop.boolean().description('Display the key instead of modifying files')
		};
	}
	
	get envFile(){
		
		let env = this.option('env');
		
		env = (env === undefined) ? '.env' : ((".env." + env));
		
		return env;
	}
	
	get envPath(){
		
		return _$pathφ.join(process.cwd(),this.envFile);
	}
	
	handle(){
		
		if (!(_$fsφ.existsSync(this.envPath))) { return this.error(("No " + (this.envFile) + " file found.")) };
		
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
		
		return 'base64:' + Buffer.from(key + ':' + _$cryptoφ.randomBytes(8).toString('hex')).toString('base64');;
	}
	
	/**
	@param {String} key
	*/
	updateEnv(key){
		
		return _$updateLineφ.updateLine(this.envPath,function(line) {
			
			if (line.startsWith('APP_KEY=')) { return ("APP_KEY=" + key) };
			
			return line;
		});
	}
};
exports.GenerateKeyCommand = GenerateKeyCommand;
