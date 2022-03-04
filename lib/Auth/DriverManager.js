function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('../Support/Helpers/isEmpty'/*$path$*/));
var $2 = requireDefault$__(require('./Drivers/JwtDriver'/*$path$*/));
var $3 = requireDefault$__(require('./Drivers/SessionDriver'/*$path$*/));
var $4 = requireDefault$__(require('./Exceptions/UnsupportedAuthDriverException'/*$path$*/));

const drivers = {
	jwt: $2.default,
	session: $3.default
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
	@param {FormRequest} request
	@param {FastifyReply} reply
	@param {any[]|null} params
	@param {Repository} config
	*/
	static get(protocol,request,reply,params,config){
		
		const provider = config.get(("auth.protocols." + protocol + ".provider"));
		
		const driver = drivers[provider];
		
		if ($1.default(driver)) {
			
			throw new $4.default(("" + provider + " is not a support driver."));
		};
		
		const authDriver = new driver(protocol,request,reply,params,config);
		
		return authDriver;
	}
};
exports.default = DriverManager;
