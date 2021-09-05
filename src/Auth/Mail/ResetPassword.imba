const { Mailable } = require '@formidablejs/mailer'
const FormRequest = require '../../Http/Request/FormRequest'

module.exports = class ResetPassword < Mailable

	prop subject\String
	prop request\Object

	def constructor request\FormRequest
		super!

		self.request = request
		self.subject = "Forgot Password"

	def render
		'publish @formidablejs/framework and @formidablejs/mailer'
