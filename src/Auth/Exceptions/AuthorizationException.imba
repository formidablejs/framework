const HttpException = require '../../Http/Exceptions/HttpException'

class AuthorizationException < HttpException

	prop status = 401

module.exports = AuthorizationException
