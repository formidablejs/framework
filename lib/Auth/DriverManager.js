function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$UnsupportedAuthDriverExceptionφ = requireDefault$__(require('./Exceptions/UnsupportedAuthDriverException'/*$path$*/));
var _$JwtDriverφ = requireDefault$__(require('./Drivers/JwtDriver'/*$path$*/));
var _$SessionDriverφ = requireDefault$__(require('./Drivers/SessionDriver'/*$path$*/));

const drivers = {
	jwt: _$JwtDriverφ.default,
	session: _$SessionDriverφ.default
};

class DriverManager {
	
	
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
			
			throw new _$UnsupportedAuthDriverExceptionφ.default(("" + provider + " is not a support driver."));
		};
		
		return new driver(protocol,request,reply,params,config);
	}
};
exports.default = DriverManager;
