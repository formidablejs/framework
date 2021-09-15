import HttpException from '../../Http/Exceptions/HttpException'

class EmailNotVerifiedException < HttpException

	prop status = 403

export default EmailNotVerifiedException
