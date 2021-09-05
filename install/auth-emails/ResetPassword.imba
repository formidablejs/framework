import { ActionComponent } from '../../resources/views/email/vendor/ActionComponent'
import { config } from '@formidablejs/helpers'
import { ContentComponent } from '../../resources/views/email/vendor/ContentComponent'
import { LayoutComponent } from '../../resources/views/email/vendor/LayoutComponent'
import { LineComponent } from '../../resources/views/email/vendor/LineComponent'
import { Mailable } from '@formidablejs/framework'
import { ParagraphComponent } from '../../resources/views/email/vendor/ParagraphComponent'

export default class ResetPassword < Mailable

	prop subject\String
	prop request\Object

	def constructor request
		super!

		self.request = request
		self.subject = "Forgot Password"

	def render
		<LayoutComponent>
			<ContentComponent slot="header">
				<p style="font-size: 20px; margin-bottom: 20px; font-weight: bold;"> config('app.name')

			<p style="font-weight: bold; font-size: 18px;"> self.request.t('auth.email.reset.greeting', 'Hello!')

			<ParagraphComponent> self.request.t('auth.email.reset.line', 'You are receiving this email because we received a password reset for your account.')
			<ActionComponent url=self.request.passwordResetUrl> self.request.t('auth.email.reset.action', 'Reset Password')
			<ParagraphComponent> self.request.t('auth.email.reset.footer', 'If you did not request a password reset, no further action is required.')

			<ParagraphComponent>
				self.request.t('auth.email.signing', 'Regards,')
				<br>
				config('app.name')

			<LineComponent>

			<ParagraphComponent>
				<br>
				<small style="color: #777;">
					self.request.t('auth.email.url', "If you are having trouble clicking the button, copy and paste the URL below into your web browser:") + ' '
					<a href=self.request.passwordResetUrl style="word-break: break-all;"> self.request.passwordResetUrl
