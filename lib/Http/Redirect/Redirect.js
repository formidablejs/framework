
const URL = require('../URL/URL'/*$path$*/);

module.exports = class Redirect {
	
	
	/**
	@param {String} path
	@param {Number} statusCode
	*/
	constructor(path,statusCode = 302){
		
		this.path = path;
		this.statusCode = statusCode;
	}
	
	/**
	@param {String} path
	*/
	static to(path){
		
		return new this(path);
	}
	
	/**
	@param {String} name
	@param {Object} params
	*/
	static route(name,params = {}){
		
		return new this(URL.route(name,params));
	}
	
	/**
	@param {Number} statusCode
	*/
	code(statusCode){
		
		this.statusCode = statusCode;
		
		return this;
	}
};
