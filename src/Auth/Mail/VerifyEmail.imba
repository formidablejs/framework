import { Mailable } from '@formidablejs/mailer'
import FormRequest from '../../Http/Request/FormRequest'

export default class VerifyEmail < Mailable

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
