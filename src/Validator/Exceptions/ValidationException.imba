import HttpException from '../../Http/Exceptions/HttpException'

class ValidationException < HttpException

	prop status = 422

	static def withMessages messages\object
		return new self({
			message: 'The given data was invalid.'
			errors: messages
		})

export default ValidationException
