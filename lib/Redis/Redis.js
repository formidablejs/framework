function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$RedisFactoryφ = requireDefault$__(require('./RedisFactory'/*$path$*/));

class Redis extends _$RedisFactoryφ.default {
	
	
	/**
	@param {String} key
	@param {String} value
	@param {any} options
	*/
	static set(key,value,options = null){
		
		return this.connection().set(key,value,options);
	}
	
	/**
	@param {String} key
	*/
	static get(key){
		
		return this.connection().get(key);
	}
	
	/**
	@param {String} key
	*/
	static del(key){
		
		return this.connection().del(key);
	}
	
	/**
	@param {String} command
	@param {String} key
	@param {String|null} value
	@param {any} nx
	*/
	static command(command,key,value = null,nx = null){
		
		return this.connection().sendCommand(command,key,value,nx);
	}
};
exports.default = Redis;
