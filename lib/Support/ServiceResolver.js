const Ψinit = Symbol.for('#init');

const Application = require('../Foundation/Application'/*$path$*/);

module.exports = class ServiceResolver {
	[Ψinit]($$ = null){
		this.app = $$ ? $$.app : undefined;
		
	}
	/**
	@param {Application} app
	*/
	constructor(app){
		this[Ψinit]();
		this.app = app;
	}
	
	boot(){
		
		return this;
	}
	
	register(){
		
		return this;
	}
};
