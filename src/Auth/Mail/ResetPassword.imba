import { Mailable } from '@formidablejs/mailer'
import FormRequest from '../../Http/Request/FormRequest'

export default class ResetPassword < Mailable

	prop subject\String
	prop request\Object

	def constructor request\FormRequest
		super()

		self.request = request
		self.subject = "Forgot Password"

	def render
		'publish @formidablejs/framework and @formidablejs/mailer'
