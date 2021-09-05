const HttpException = require '../../Http/Exceptions/HttpException'

class EmailVerifiedException < HttpException

	prop status = 403

module.exports = EmailVerifiedException
