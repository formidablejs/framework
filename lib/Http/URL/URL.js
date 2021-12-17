function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};;
function iter$__(a){ let v; return a ? ((v=a.toIterable) ? v.call(a) : a) : []; };
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$isEmptyφ = requireDefault$__(require('../../Support/Helpers/isEmpty'/*$path$*/));
var _$isStringφ = requireDefault$__(require('../../Support/Helpers/isString'/*$path$*/));
var _$jsonwebtokenφ = requireDefault$__(require('jsonwebtoken'/*$path$*/));
var _$MissingRouteParamExceptionφ = requireDefault$__(require('./Exceptions/MissingRouteParamException'/*$path$*/));
var _$Pathφ = requireDefault$__(require('../Router/Path'/*$path$*/));
var _$Routeφ = requireDefault$__(require('../Router/Route'/*$path$*/));
var _$UnregisteredRouteExceptionφ = requireDefault$__(require('./Exceptions/UnregisteredRouteException'/*$path$*/));

const settings = {
	secret: null
};

class URL {
	
	
	/**
	@param {String} name
	@param {Object} params
	@param {Object} query
	*/
	static route(name,params = new Object,query = new Object){
		
		let selected;;
		
		for (let key = 0, itemsφ = iter$__(_$Routeφ.default.all()), lenφ = itemsφ.length; key < lenφ; key++) {
			let route = itemsφ[key];
			if (route.name === name) { selected = route };
		};
		
		if (_$isEmptyφ.default(selected)) {
			
			throw new _$UnregisteredRouteExceptionφ.default('Route is not registered');
		};
		
		if (selected.path.trim() == '/') {
			
			let uri = selected.path;
			
			if (Object.keys(query).length > 0) {
				
				uri = uri + '?' + this.toQuery(query);
			};
			
			return uri;
		};
		
		this.uri = new String;
		
		for (let key = 0, itemsφ2 = iter$__(selected.path.split('/')), lenφ2 = itemsφ2.length; key < lenφ2; key++) {
			let path = itemsφ2[key];
			if (path.startsWith(':') && !((params[path.split(':')[1]]))) {
				
				throw new _$MissingRouteParamExceptionφ.default(("Missing param: " + (path.split(':')[1])));
			};
			
			this.uri = this.uri + (path.startsWith(':') ? params[path.split(':')[1]] : path) + '/';
		};
		
		this.uri = _$Pathφ.default.clean([],this.uri);
		
		if (Object.keys(query).length > 0) {
			
			this.uri = this.uri + '?' + this.toQuery(query);
		};
		
		return this.uri;
	}
	
	/**
	@param {String} name
	@param {Object} params
	@param {Object} query
	*/
	static async signedRoute(name,params = new Object,query = new Object){
		
		const uri = this.route(name,params,query);
		
		const signature = await _$jsonwebtokenφ.default.sign({uri: uri},settings.secret,{});
		
		return uri.includes('?') ? (("" + uri + "&signature=" + signature)) : (("" + uri + "?signature=" + signature));
	}
	
	/**
	@param {String} name
	@param {String} expiresIn
	@param {Object} params
	@param {Object} query
	*/
	static async temporarySignedRoute(name,expiresIn,params = new Object,query = new Object){
		
		let uri = this.route(name,params,query);
		
		const signature = await _$jsonwebtokenφ.default.sign({uri: uri},settings.secret,{expiresIn: expiresIn});
		
		return uri.includes('?') ? (("" + uri + "&signature=" + signature)) : (("" + uri + "?signature=" + signature));
	}
	
	/**
	@param {String} uri
	@param {Object} query
	*/
	static path(uri,query = new Object){
		
		uri = _$Pathφ.default.clean([],uri);
		
		if (Object.keys(query).length > 0) {
			
			uri = uri + '?' + this.toQuery(query);
		};
		
		return uri;
	}
	
	/**
	@param {String} uri
	@param {Object} query
	*/
	static async signed(uri,query = new Object){
		
		uri = this.path(uri,query);
		
		const signature = await _$jsonwebtokenφ.default.sign({uri: uri},settings.secret,{});
		
		return uri.includes('?') ? (("" + uri + "&signature=" + signature)) : (("" + uri + "?signature=" + signature));
	}
	
	/**
	@param {String} uri
	@param {String} expiresIn
	@param {Object} query
	*/
	static async temporarySigned(uri,expiresIn,query = new Object){
		
		this.luri = this.route(uri,query);
		
		const signature = await _$jsonwebtokenφ.default.sign({uri: uri},settings.secret,{expiresIn: expiresIn});
		
		return uri.includes('?') ? (("" + uri + "&signature=" + signature)) : (("" + uri + "?signature=" + signature));
	}
	
	/**
	@param {Object} params
	*/
	static toQuery(params = new Object){
		
		const query = [];
		
		Object.keys(params).forEach(function(key) {
			
			return query.push(("" + key + "=" + (params[key])));
		});
		
		return query.join('&');
	}
	
	/**
	@param {String} secret
	*/
	static setSecret(secret){
		
		if (!(_$isStringφ.default(secret))) { throw new TypeError('secret must be a String') };
		
		settings.secret = secret;
		
		return this;
	}
};
exports.default = URL;
