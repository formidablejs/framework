const $__initor__$ = Symbol.for('#__initor__'), $__inited__$ = Symbol.for('#__inited__'), $__hooks__$ = Symbol.for('#__hooks__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
class InfiniteHigherOrderTapProxy {
	
	
	constructor(object){
		
		return new Proxy(object,{
			get: function(target,prop) {
				
				if (prop == 'untap') { return function() { return target; } };
				
				if (typeof target[prop] == 'function') {
					
					return function(...args) {
						
						target[prop].apply(
							target,args
						);
						
						return this;
					};
				};
				
				return target[prop];
			}
		});
	}
};
exports.InfiniteHigherOrderTapProxy = InfiniteHigherOrderTapProxy;
