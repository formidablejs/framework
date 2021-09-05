const HttpException = require './HttpException'

class ForbiddenException < HttpException

	prop status = 403

module.exports = ForbiddenException
