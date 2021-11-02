function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$HttpExceptionφ = requireDefault$__(require('./Exceptions/HttpException'/*$path$*/));
var _$NotFoundExceptionφ = requireDefault$__(require('./Exceptions/NotFoundException'/*$path$*/));
var _$Validatorφ = requireDefault$__(require('../Validator/Validator'/*$path$*/));
var _$ViewResponseφ = requireDefault$__(require('./Response/ViewResponse'/*$path$*/));
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
		
		throw new _$NotFoundExceptionφ.default(message);
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
		
		throw new _$HttpExceptionφ.default(message,400);
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
		
		return _$ViewResponseφ.default.make(view,data);
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
		
		return _$Validatorφ.default.make(request.input(),rules);
	}
};
exports.default = Controller;
