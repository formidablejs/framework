function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('./Exceptions/UnsupportedSessionDriverException'/*$path$*/));

const drivers = {};

class DriverManager {
	
	
	/**
	@param {string} name
	@param {object} driver
	*/
	static register(name,driver){
		
		return drivers[name] = driver;
	}
	
	/**
	@param {string} name
	*/
	static get(name){
		
		const driver = drivers[name];
		
		if (driver == null || driver == undefined) {
			
			throw new $1.default(("" + name + " is not a supported driver."));
		};
		
		return driver;
	}
	
	/**
	@param {string} name
	*/
	static isRegistered(name){
		
		const driver = drivers[name];
		
		return driver !== undefined || driver !== null;
	}
};
exports.default = DriverManager;

