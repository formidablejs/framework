import HttpException from './HttpException'

class NotFoundException < HttpException

	prop status = 404

export default NotFoundException
