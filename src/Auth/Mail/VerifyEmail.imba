import { Mailable } from '../../Mail/Mailable'
import FormRequest from '../../Http/Request/FormRequest'

export default class VerifyEmail < Mailable

	prop subject\string
	prop request\FormRequest
	prop user\object

	def constructor request\FormRequest, user\object
		super()

		self.request = request
		self.subject = request.t('auth.email.verify.subject', 'Verify Email Address')
		self.user = user

	def render
		'publish @formidablejs/framework and @formidablejs/mailer'
