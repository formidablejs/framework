import HttpException from './HttpException'

class BadRequestException < HttpException

	prop status = 400

export default BadRequestException
