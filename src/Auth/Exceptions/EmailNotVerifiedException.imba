const HttpException = require '../../Http/Exceptions/HttpException'

class EmailNotVerifiedException < HttpException

	prop status = 403

module.exports = EmailNotVerifiedException
