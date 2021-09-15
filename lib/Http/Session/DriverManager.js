function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$UnsupportedSessionDriverExceptionφ = requireDefault$__(require('./Exceptions/UnsupportedSessionDriverException'/*$path$*/));

const drivers = {};

class DriverManager {
	
	
	/**
	@param {String} name
	@param {Object} driver
	*/
	static register(name,driver){
		
		return drivers[name] = driver;
	}
	
	/**
	@param {String} name
	*/
	static get(name){
		
		const driver = drivers[name];
		
		if (driver == null || driver == undefined) {
			
			throw new _$UnsupportedSessionDriverExceptionφ.default(("" + name + " is not a supported driver."));
		};
		
		return driver;
	}
	
	/**
	@param {String} name
	*/
	static isRegistered(name){
		
		const driver = drivers[name];
		
		return driver !== undefined || driver !== null;
	}
};
exports.default = DriverManager;

