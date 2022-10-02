function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};;
function iter$__(a){ let v; return a ? ((v=a.toIterable) ? v.call(a) : a) : a; };
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('../../Support/Helpers/isEmpty'/*$path$*/));
var $2 = requireDefault$__(require('../../Support/Helpers/isString'/*$path$*/));
var $3 = requireDefault$__(require('jsonwebtoken'/*$path$*/));
var $4 = requireDefault$__(require('./Exceptions/MissingRouteParamException'/*$path$*/));
var $5 = requireDefault$__(require('../Router/Path'/*$path$*/));
var $6 = requireDefault$__(require('../Router/Route'/*$path$*/));
var $7 = requireDefault$__(require('./Exceptions/UnregisteredRouteException'/*$path$*/));

const settings = {
	secret: null
};

class URL {
	
	
	/**
	@param {string} name
	@param {object} params
	@param {object} query
	*/
	static route(name,params = new Object,query = new Object){
		
		let selected;;
		
		for (let key = 0, $8 = iter$__($6.default.all()), $9 = $8.length; key < $9; key++) {
			let route = $8[key];
			if (route.name === name) { selected = route };
		};
		
		if ($1.default(selected)) {
			
			throw new $7.default('Route is not registered');
		};
		
		if (selected.path.trim() == '/') {
			
			let uri = selected.path;
			
			if (Object.keys(query).length > 0) {
				
				uri = uri + '?' + this.toQuery(query);
			};
			
			return uri;
		};
		
		this.uri = new String;
		
		for (let key = 0, $10 = iter$__(selected.path.split('/')), $11 = $10.length; key < $11; key++) {
			let path = $10[key];
			if (path.startsWith(':') && !((params[path.split(':')[1]]))) {
				
				throw new $4.default(("Missing param: " + (path.split(':')[1])));
			};
			
			this.uri = this.uri + (path.startsWith(':') ? params[path.split(':')[1]] : path) + '/';
		};
		
		this.uri = $5.default.clean([],this.uri);
		
		if (Object.keys(query).length > 0) {
			
			this.uri = this.uri + '?' + this.toQuery(query);
		};
		
		return this.uri;
	}
	
	/**
	@param {string} name
	@param {object} params
	@param {object} query
	*/
	static async signedRoute(name,params = new Object,query = new Object){
		
		const uri = this.route(name,params,query);
		
		const signature = await $3.default.sign({uri: uri},settings.secret,{});
		
		return uri.includes('?') ? (("" + uri + "&signature=" + signature)) : (("" + uri + "?signature=" + signature));
	}
	
	/**
	@param {string} name
	@param {string} expiresIn
	@param {object} params
	@param {object} query
	*/
	static async temporarySignedRoute(name,expiresIn,params = new Object,query = new Object){
		
		let uri = this.route(name,params,query);
		
		const signature = await $3.default.sign({uri: uri},settings.secret,{expiresIn: expiresIn});
		
		return uri.includes('?') ? (("" + uri + "&signature=" + signature)) : (("" + uri + "?signature=" + signature));
	}
	
	/**
	@param {string} uri
	@param {object} query
	*/
	static path(uri,query = new Object){
		
		uri = $5.default.clean([],uri);
		
		if (Object.keys(query).length > 0) {
			
			uri = uri + '?' + this.toQuery(query);
		};
		
		return uri;
	}
	
	/**
	@param {string} uri
	@param {object} query
	*/
	static async signed(uri,query = new Object){
		
		uri = this.path(uri,query);
		
		const signature = await $3.default.sign({uri: uri},settings.secret,{});
		
		return uri.includes('?') ? (("" + uri + "&signature=" + signature)) : (("" + uri + "?signature=" + signature));
	}
	
	/**
	@param {string} uri
	@param {string} expiresIn
	@param {object} query
	*/
	static async temporarySigned(uri,expiresIn,query = new Object){
		
		this.luri = this.route(uri,query);
		
		const signature = await $3.default.sign({uri: uri},settings.secret,{expiresIn: expiresIn});
		
		return uri.includes('?') ? (("" + uri + "&signature=" + signature)) : (("" + uri + "?signature=" + signature));
	}
	
	/**
	@param {object} params
	*/
	static toQuery(params = new Object){
		
		const query = [];
		
		Object.keys(params).forEach(function(key) {
			
			return query.push(("" + key + "=" + (params[key])));
		});
		
		return query.join('&');
	}
	
	/**
	@param {string} secret
	*/
	static setSecret(secret){
		
		if (!($2.default(secret))) { throw new TypeError('secret must be a String') };
		
		settings.secret = secret;
		
		return this;
	}
};
exports.default = URL;
