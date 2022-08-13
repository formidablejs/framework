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
	
	/**
	@param {string} type
	@param {string} message
	@param {boolean} newLine
	*/
	message(type,message,newLine = true){
		
		type = type.toLowerCase();
		
		if (!(['error','warning','info'].includes(type))) {
			
			throw new Error('Invalid message type.');
		};
		
		const bgMap = {
			error: 'red',
			info: 'blue',
			warning: 'yellow'
		};
		
		let fg = '';
		
		if (type == 'warning') {
			
			fg = 'fg:red';
		};
		
		return this.write(("\n  <bg:" + (bgMap[type]) + ">" + (fg ? ('<' + fg + '>') : '') + " " + type.toUpperCase() + " " + (fg ? ('</' + fg + '>') : '') + "</bg:" + (bgMap[type]) + "> " + message + (newLine ? "\n" : '')));
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
