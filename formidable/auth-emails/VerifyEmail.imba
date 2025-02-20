import { VerifyEmail as Mailable } from '@formidablejs/framework'
import { ActionComponent } from '../../resources/views/mail/vendor/ActionComponent'
import { ContentComponent } from '../../resources/views/mail/vendor/ContentComponent'
import { LayoutComponent } from '../../resources/views/mail/vendor/LayoutComponent'
import { LineComponent } from '../../resources/views/mail/vendor/LineComponent'
import { ParagraphComponent } from '../../resources/views/mail/vendor/ParagraphComponent'

export class VerifyEmail < Mailable

	def render
		<LayoutComponent>
			<ContentComponent slot="header">
				<p style="font-size: 20px; margin-bottom: 20px; font-weight: bold;"> config('app.name')

			<p style="font-weight: bold; font-size: 18px;"> request.__('auth.email.verify.greeting', 'Hello!')

			<ParagraphComponent> request.__('auth.email.verify.line', 'Please click the button below to verify your email address.')
			<ActionComponent url=request.verificationUrl> request.__('auth.email.verify.action', 'Verify Email Address')
			<ParagraphComponent> request.__('auth.email.verify.footer', 'If you did not create an account, no further action is required.')

			<ParagraphComponent>
				request.__('auth.email.signing', 'Regards,')
				<br>
				config('app.name')

			<LineComponent>

			<ParagraphComponent>
				<br>
				<small style="color: #777;">
					request.__('auth.email.url', "If you are having trouble clicking the button, copy and paste the URL below into your web browser:") + ' '
					<a href=request.verificationUrl style="word-break: break-all;"> request.verificationUrl
