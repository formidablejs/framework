const HttpException = require '../../Http/Exceptions/HttpException'

class ValidationException < HttpException

	prop status = 422

	static def withMessages messages\Object
		return new self({
			message: 'The given data was invalid.'
			errors: messages
		})

module.exports = ValidationException
