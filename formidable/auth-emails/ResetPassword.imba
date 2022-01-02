import { ActionComponent } from '../../resources/views/mail/vendor/ActionComponent'
import { ContentComponent } from '../../resources/views/mail/vendor/ContentComponent'
import { helpers } from '@formidablejs/framework'
import { LayoutComponent } from '../../resources/views/mail/vendor/LayoutComponent'
import { LineComponent } from '../../resources/views/mail/vendor/LineComponent'
import { ParagraphComponent } from '../../resources/views/mail/vendor/ParagraphComponent'
import { ResetPassword as Mailable } from '@formidablejs/framework/lib/Auth/Mail'

export class ResetPassword < Mailable

	def render
		<LayoutComponent>
			<ContentComponent slot="header">
				<p style="font-size: 20px; margin-bottom: 20px; font-weight: bold;"> helpers.config('app.name')

			<p style="font-weight: bold; font-size: 18px;"> self.request.t('auth.email.reset.greeting', 'Hello!')

			<ParagraphComponent> self.request.t('auth.email.reset.line', 'You are receiving this email because we received a password reset for your account.')
			<ActionComponent url=self.request.passwordResetUrl> self.request.t('auth.email.reset.action', 'Reset Password')
			<ParagraphComponent> self.request.t('auth.email.reset.footer', 'If you did not request a password reset, no further action is required.')

			<ParagraphComponent>
				self.request.t('auth.email.signing', 'Regards,')
				<br>
				helpers.config('app.name')

			<LineComponent>

			<ParagraphComponent>
				<br>
				<small style="color: #777;">
					self.request.t('auth.email.url', "If you are having trouble clicking the button, copy and paste the URL below into your web browser:") + ' '
					<a href=self.request.passwordResetUrl style="word-break: break-all;"> self.request.passwordResetUrl
