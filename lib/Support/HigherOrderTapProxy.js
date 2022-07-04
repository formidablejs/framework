const $__initor__$ = Symbol.for('#__initor__'), $__inited__$ = Symbol.for('#__inited__'), $__hooks__$ = Symbol.for('#__hooks__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
class HigherOrderTapProxy {
	
	
	constructor(object){
		
		return new Proxy(object,{
			get: function(target,prop) {
				
				if (typeof target[prop] == 'function') {
					
					return function(...args) {
						
						target[prop].apply(
							target,args
						);
						
						return target;
					};
				};
				
				return target[prop];
			}
		});
	}
};
exports.HigherOrderTapProxy = HigherOrderTapProxy;
