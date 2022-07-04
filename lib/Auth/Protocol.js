function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const $__init__$ = Symbol.for('#__init__'), $__patch__$ = Symbol.for('#__patch__'), $__initor__$ = Symbol.for('#__initor__'), $__inited__$ = Symbol.for('#__inited__'), $__hooks__$ = Symbol.for('#__hooks__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('../Support/Helpers/isEmpty'/*$path$*/));
var $2 = requireDefault$__(require('./Auth'/*$path$*/));
var $3 = requireDefault$__(require('../Config/Repository'/*$path$*/));

class Protocol {
	[$__patch__$]($$ = {}){
		var $4;
		($4 = $$.config) !== undefined && (this.config = $4);
		
	}
	[$__init__$]($$ = null,deep = true){
		this.config = $$ ? $$.config : undefined;
		
	}
	/**
	@param {Repository} config
	*/
	constructor(config){
		this[$__init__$]();
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
