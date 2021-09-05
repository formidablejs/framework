const HttpException = require './HttpException'

class BadRequestException < HttpException

	prop status = 400

module.exports = BadRequestException
