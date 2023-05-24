import bind from '../Support/Helpers/bind'
import BadRequestException from './Exceptions/BadRequestException'
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
	def notFound message\string = 'Not Found'
		throw new NotFoundException message

	/**
	 * Throw a 400 exception.
	 *
	 * @throws {BadRequestException}
	 */
	def badRequest message\string = 'Bad Request'
		throw new BadRequestException message, 400

	/**
	 * Render a view.
	 */
	def view view\function|View, data\object = {}
		ViewResponse.make(view, data)

	/**
	 * Validate request.
	 */
	def validate request\FormRequest|Request, rules\object = null
		Validator.make(request.input!, rules)

	/**
	 * Bind route param.
	 */
	def bind table\string, first\boolean = true
		bind(table, first)
