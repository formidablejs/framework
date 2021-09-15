import HttpException from '../../Http/Exceptions/HttpException'

class EmailVerifiedException < HttpException

	prop status = 403

export default EmailVerifiedException
