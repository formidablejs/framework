function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('./Exceptions/HttpException'/*$path$*/));
var $2 = requireDefault$__(require('./Exceptions/NotFoundException'/*$path$*/));
var $3 = requireDefault$__(require('../Validator/Validator'/*$path$*/));
var $4 = requireDefault$__(require('./Response/ViewResponse'/*$path$*/));
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
		
		throw new $2.default(message);
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
		
		throw new $1.default(message,400);
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
		
		return $4.default.make(view,data);
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
		
		return $3.default.make(request.input(),rules);
	}
};
exports.default = Controller;
