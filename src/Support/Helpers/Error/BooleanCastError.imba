export default class BooleanCastError < Error

	def constructor message\string
		super message

		this.message = message

		this.name = 'BooleanCastError'
