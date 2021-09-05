const { config } = require '@formidablejs/helpers'
const { Mailable } = require '@formidablejs/mailer'
const FormRequest = require '../../Http/Request/FormRequest'
const URL = require '../../Http/URL/URL'

module.exports = class VerifyEmail < Mailable

	prop subject\String
	prop request\FormRequest
	prop user\Object

	def constructor request\FormRequest, user\Object
		super!

		self.request = request
		self.subject = request.t('auth.email.verify.subject', 'Verify Email Address')
		self.user = user

	def render
		'publish @formidablejs/framework and @formidablejs/mailer'
