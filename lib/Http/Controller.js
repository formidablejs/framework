function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('../Support/Decorators/use'/*$path$*/);
var $2 = requireDefault$__(require('../Support/Helpers/bind'/*$path$*/));
var $3 = requireDefault$__(require('./Exceptions/HttpException'/*$path$*/));
var $4 = requireDefault$__(require('./Exceptions/NotFoundException'/*$path$*/));
var $5 = requireDefault$__(require('../Validator/Validator'/*$path$*/));
var $6 = requireDefault$__(require('./Response/ViewResponse'/*$path$*/));
globalThis.αuse = $1.use();

class Controller {
	
	
	/**
		 * Throw a 404 exception.
		 *
		 * @throws {NotFoundException}
		 */
	
	/**
	*
		 * Throw a 404 exception.
		 *
		 * @throws {NotFoundException}
		 
	@param {String} message
	*/
	notFound(message = 'Not Found'){
		
		throw new $4.default(message);
	}
	
	/**
		 * Throw a 400 exception.
		 *
		 * @throws {HttpException}
		 */
	
	/**
	*
		 * Throw a 400 exception.
		 *
		 * @throws {HttpException}
		 
	@param {String} message
	*/
	badRequest(message = 'Bad Request'){
		
		throw new $3.default(message,400);
	}
	
	/**
		 * Render a view.
		 */
	
	/**
	*
		 * Render a view.
		 
	@param {Function|View} view
	@param {Object} data
	*/
	view(view,data = {}){
		
		return $6.default.make(view,data);
	}
	
	/**
		 * Validate request.
		 */
	
	/**
	*
		 * Validate request.
		 
	@param {FormRequest|Request} request
	@param {Object} rules
	*/
	validate(request,rules = null){
		
		return $5.default.make(request.input(),rules);
	}
	
	/**
		 * Bind route param.
		 */
	
	/**
	*
		 * Bind route param.
		 
	@param {String} table
	@param {Boolean} first
	*/
	bind(table,first = true){
		
		return $2.default(table,first);
	}
};
exports.default = Controller;
