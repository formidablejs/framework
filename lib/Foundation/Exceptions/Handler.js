const Ψinit = Symbol.for('#init');

const {handleException: handleException,setConfig: setConfig} = require('./Handler/handleException'/*$path$*/);

module.exports = class Handler {
	[Ψinit]($$ = null){
		this.config = $$ ? $$.config : undefined;
		
	}
	constructor(config){
		this[Ψinit]();
		this.config = config;
		
		setConfig(this.config);
	}
	
	handle(error,request,reply){
		
		return handleException(error,request,reply);
	}
};
