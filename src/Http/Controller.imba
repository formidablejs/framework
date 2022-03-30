import bind from '../Support/Helpers/bind'
import HttpException from './Exceptions/HttpException'
import NotFoundException from './Exceptions/NotFoundException'
import Validator from '../Validator/Validator'
import ViewResponse from './Response/ViewResponse'
import type FormRequest from './Request/FormRequest'
import type Request from './Request/FormRequest'
import type View from './View/View'

export default class Controller

	/**
	 * Throw a 404 exception.
	 *
	 * @throws {NotFoundException}
	 */
	def notFound message\String = 'Not Found'
		throw new NotFoundException message

	/**
	 * Throw a 400 exception.
	 *
	 * @throws {HttpException}
	 */
	def badRequest message\String = 'Bad Request'
		throw new HttpException message, 400

	/**
	 * Render a view.
	 */
	def view view\Function|View, data\Object = {}
		ViewResponse.make(view, data)

	/**
	 * Validate request.
	 */
	def validate request\FormRequest|Request, rules\Object = null
		Validator.make(request.input!, rules)

	/**
	 * Bind route param.
	 */
	def bind table\String, first\Boolean = true
		bind(table, first)
