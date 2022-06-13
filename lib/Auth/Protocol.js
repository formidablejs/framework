function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const $4 = Symbol.for('#__init__'), $5 = Symbol.for('#__patch__'), $8 = Symbol.for('#__initor__'), $9 = Symbol.for('#__inited__'), $6 = Symbol.for('#__hooks__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('../Support/Helpers/isEmpty'/*$path$*/));
var $2 = requireDefault$__(require('./Auth'/*$path$*/));
var $3 = requireDefault$__(require('../Config/Repository'/*$path$*/));

class Protocol {
	[$5]($$ = {}){
		var $7;
		($7 = $$.config) !== undefined && (this.config = $7);
		
	}
	[$4]($$ = null,deep = true){
		this.config = $$ ? $$.config : undefined;
		
	}
	/**
	@param {Repository} config
	*/
	constructor(config){
		this[$4]();
		this.config = config;
	}
	
	/**
	@param {Repository} config
	*/
	static make(config){
		
		return new this(config);
	}
	
	/**
	@param {String} protocol
	*/
	configure(protocol){
		
		const fetchedProtocol = this.config.get(("auth.protocols." + protocol + ".provider"));
		
		if ($1.default(fetchedProtocol)) {
			
			throw new Error(("" + protocol + " is not a valid authentication protocol"));
		};
		
		const provider = this.config.get(("auth.providers." + fetchedProtocol));
		
		return $2.default.setProvider(provider);
	}
};
exports.default = Protocol;
