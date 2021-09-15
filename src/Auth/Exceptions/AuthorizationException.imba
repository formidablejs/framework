import HttpException from '../../Http/Exceptions/HttpException'

class AuthorizationException < HttpException

	prop status = 401

export default AuthorizationException
