import { ActionComponent } from '../../resources/views/mail/vendor/ActionComponent'
import { ContentComponent } from '../../resources/views/mail/vendor/ContentComponent'
import { helpers } from '@formidablejs/framework'
import { LayoutComponent } from '../../resources/views/mail/vendor/LayoutComponent'
import { LineComponent } from '../../resources/views/mail/vendor/LineComponent'
import { ParagraphComponent } from '../../resources/views/mail/vendor/ParagraphComponent'
import { VerifyEmail as Mailable } from '@formidablejs/framework/lib/Auth/Mail'

export class VerifyEmail < Mailable

	def render
		<LayoutComponent>
			<ContentComponent slot="header">
				<p style="font-size: 20px; margin-bottom: 20px; font-weight: bold;"> helpers.config('app.name')

			<p style="font-weight: bold; font-size: 18px;"> self.request.t('auth.email.verify.greeting', 'Hello!')

			<ParagraphComponent> self.request.t('auth.email.verify.line', 'Please click the button below to verify your email address.')
			<ActionComponent url=self.request.verificationUrl> self.request.t('auth.email.verify.action', 'Verify Email Address')
			<ParagraphComponent> self.request.t('auth.email.verify.footer', 'If you did not create an account, no further action is required.')

			<ParagraphComponent>
				self.request.t('auth.email.signing', 'Regards,')
				<br>
				helpers.config('app.name')

			<LineComponent>

			<ParagraphComponent>
				<br>
				<small style="color: #777;">
					self.request.t('auth.email.url', "If you are having trouble clicking the button, copy and paste the URL below into your web browser:") + ' '
					<a href=self.request.verificationUrl style="word-break: break-all;"> self.request.verificationUrl
