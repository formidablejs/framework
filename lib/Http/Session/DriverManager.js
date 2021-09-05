
const UnsupportedSessionDriverException = require('./Exceptions/UnsupportedSessionDriverException'/*$path$*/);

const drivers = {};

module.exports = class DriverManager {
	
	
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
			
			throw new UnsupportedSessionDriverException(("" + name + " is not a supported driver."));
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

