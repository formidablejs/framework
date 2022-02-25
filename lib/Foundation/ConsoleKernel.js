function iter$__(a){ let v; return a ? ((v=a.toIterable) ? v.call(a) : a) : []; };
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$GenerateKeyCommandφ = require('./Commands/GenerateKeyCommand'/*$path$*/);
class ConsoleKernel {
	
	
	get default(){
		
		return [
			_$GenerateKeyCommandφ.GenerateKeyCommand
		];
	}
	
	get registered(){
		
		return [];
	}
	
	/**
	@param {Application} app
	*/
	registerCommands(app){
		var resφ;
		
		for (let iφ = 0, itemsφ = iter$__(this.default), lenφ = itemsφ.length; iφ < lenφ; iφ++) {
			let command = itemsφ[iφ];
			app.register(command);
		};
		
		resφ = [];
		for (let iφ2 = 0, itemsφ2 = iter$__(this.registered), lenφ2 = itemsφ2.length; iφ2 < lenφ2; iφ2++) {
			let command = itemsφ2[iφ2];
			resφ.push(app.register(command));
		};
		return resφ;
	}
};
exports.default = ConsoleKernel;
