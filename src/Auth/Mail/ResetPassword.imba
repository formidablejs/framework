import { Mailable } from '../../Mail/Mailable'
import FormRequest from '../../Http/Request/FormRequest'

export default class ResetPassword < Mailable

	prop subject\string
	prop request\object

	def constructor request\FormRequest
		super()

		self.request = request
		self.subject = "Forgot Password"

	def render
		'publish @formidablejs/framework and @formidablejs/mailer'
