import HttpException from './HttpException'

class ForbiddenException < HttpException

	prop status = 403

export default ForbiddenException
