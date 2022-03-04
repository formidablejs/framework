function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const $5 = Symbol.for('#__initor__'), $6 = Symbol.for('#__inited__'), $4 = Symbol.for('#__hooks__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('../../Auth'/*$path$*/));
var $2 = requireDefault$__(require('../../DriverManager'/*$path$*/));
var $3 = requireDefault$__(require('../../../Support/Helpers/isEmpty'/*$path$*/));
class Authenticate {
	
	
	/**
	@param {Repository} config
	*/
	constructor(config){
		
		this.config = config;
	}
	
	/**
	@param {FormRequest} request
	@param {FastifyReply} reply
	@param {any[]|null} params
	*/
	async handle(request,reply,params){
		
		const [protocol] = (!($3.default(params[0]))) ? params : [this.defaultProtocol];
		
		this.configure(protocol);
		
		const handler = $2.default.get(protocol,request,reply,params,this.config);
		
		const personalAccessToken = await handler.verify();
		
		return request.auth = function() { return new $1.default(
			personalAccessToken.tokenable,
			personalAccessToken.token.abilities,
			handler
		); };
	}
	
	get defaultProtocol(){
		
		return this.config.get('auth.defaults.protocol','api');
	}
	
	/**
	@param {String} protocol
	*/
	configure(protocol){
		
		const fetchedProtocol = this.config.get(("auth.protocols." + protocol + ".provider"));
		
		if ($3.default(fetchedProtocol)) {
			
			throw new Error(("" + protocol + " is not a valid authentication protocol"));
		};
		
		const provider = this.config.get(("auth.providers." + fetchedProtocol));
		
		return $1.default.setProvider(provider);
	}
};
exports.default = Authenticate;
