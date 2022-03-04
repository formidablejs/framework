function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('inquirer'/*$path$*/));
var $2 = require('@formidablejs/console'/*$path$*/);
class Command extends $2.Command {
	
	
	// @returns {Application}
	get app(){
		
		return this.constructor.ctx;
	}
	
	// @returns {String}
	/**
	@param {String} default
	*/
	env(default$){
		
		return this.app.config.get('app.env',default$);
	}
	
	usingEnv(){
		
		return this.write(("Using environment: <fg:green>" + this.env('development') + "</fg:green>"));
	}
	
	// @returns {Promise<Boolean>}
	/**
	@param {String} message
	*/
	async confirm(message){
		
		const results = await $1.default.prompt([{
			name: 'run',
			message: message,
			type: 'confirm'
		}]);
		
		return results.run;
	}
	
	// @returns {Promise<boolean>}
	async shouldRun(){
		
		if (this.env('development').toLowerCase().trim() === 'production' && (this.globalOptions ? this.globalOptions.noInteraction : false) !== true) {
			
			this.info(`**************************************\n*     Application In Production!     *\n**************************************`);
			
			const confirmed = await this.confirm('Do you really wish to run this command');
			
			if (!confirmed) {
				
				this.info("Command Canceled!");
				
				this.exit();
			};
			
			return confirmed;
		} else {
			return true;
		};
	}
	
	/**
	@param {Number} code
	*/
	exit(code = 0){
		
		return process.exit(code);
	}
};
exports.Command = Command;
