import VerifyEmailRequest from '../Requests/VerifyEmailRequest'
import EmailResendRequest from '../Requests/EmailResendRequest'
import Controller from '../../../Http/Controller'
import { @use } from '../../../Support/Decorators/use'

const emailVerification = {
	onVerification: null
	onEmailResend: null
}

class EmailVerificationController < Controller

	@use(VerifyEmailRequest)
	def verify request\VerifyEmailRequest, reply
		const handler = emailVerification.onVerification

		if handler then return handler(request, reply)

		request.persist!

	@use(EmailResendRequest)
	def resend request\EmailResendRequest, reply
		const handler = emailVerification.onEmailResend

		if handler then return handler(request, reply)

		request.persist!

	static def onVerification handler\Function
		if emailVerification.onVerification !== null
			throw new Error 'onVerification handler is already set.'

			return

		emailVerification.onVerification = handler

	static def onEmailResend handler\Function
		if emailVerification.onEmailResend !== null
			throw new Error 'onEmailResend handler is already set.'

			return

		emailVerification.onEmailResend = handler

export default EmailVerificationController
