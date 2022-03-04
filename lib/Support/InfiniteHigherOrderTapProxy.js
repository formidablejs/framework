const $2 = Symbol.for('#__initor__'), $3 = Symbol.for('#__inited__'), $1 = Symbol.for('#__hooks__');
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
