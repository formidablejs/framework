const HttpException = require './HttpException'

class NotFoundException < HttpException

	prop status = 404

module.exports = NotFoundException
