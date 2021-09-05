
const UnsupportedAuthDriverException = require('./Exceptions/UnsupportedAuthDriverException'/*$path$*/);
const JwtDriver = require('./Drivers/JwtDriver'/*$path$*/);
const SessionDriver = require('./Drivers/SessionDriver'/*$path$*/);

const drivers = {
	jwt: JwtDriver,
	session: SessionDriver
};

module.exports = class DriverManager {
	
	
	/**
	@param {String} name
	@param {Object} driver
	*/
	static register(name,driver){
		
		return drivers[name] = driver;
	}
	
	/**
	@param {String} protocol
	*/
	static get(protocol,request,reply,params,config){
		
		const provider = config.get(("auth.protocols." + protocol + ".provider"));
		
		const driver = drivers[provider];
		
		if (driver == null || driver == undefined) {
			
			throw new UnsupportedAuthDriverException(("" + provider + " is not a support driver."));
		};
		
		return new driver(protocol,request,reply,params,config);
	}
};
