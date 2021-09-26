function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$isEmptyφ = requireDefault$__(require('../Support/Helpers/isEmpty'/*$path$*/));
var _$JwtDriverφ = requireDefault$__(require('./Drivers/JwtDriver'/*$path$*/));
var _$SessionDriverφ = requireDefault$__(require('./Drivers/SessionDriver'/*$path$*/));
var _$UnsupportedAuthDriverExceptionφ = requireDefault$__(require('./Exceptions/UnsupportedAuthDriverException'/*$path$*/));

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
	@param {FormRequest} request
	@param {FastifyReply} reply
	@param {any[]|null} params
	@param {Repository} config
	*/
	static get(protocol,request,reply,params,config){
		
		const provider = config.get(("auth.protocols." + protocol + ".provider"));
		
		const driver = drivers[provider];
		
		if (_$isEmptyφ.default(driver)) {
			
			throw new _$UnsupportedAuthDriverExceptionφ.default(("" + provider + " is not a support driver."));
		};
		
		const authDriver = new driver(protocol,request,reply,params,config);
		
		return authDriver;
	}
};
exports.default = DriverManager;
