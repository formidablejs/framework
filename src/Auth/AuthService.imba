import PersonalAccessToken from './Tokens/PersonalAccessToken'
import { Mailable } from '@formidablejs/mailer'
import Driver from './Drivers/Driver'

import BeforeForgot from './Http/Middleware/BeforeForgot'
import BeforeLogin from './Http/Middleware/BeforeLogin'
import BeforeLogout from './Http/Middleware/BeforeLogout'
import BeforeRegister from './Http/Middleware/BeforeRegister'
import BeforeResend from './Http/Middleware/BeforeResend'
import BeforeReset from './Http/Middleware/BeforeReset'
import BeforeVerify from './Http/Middleware/BeforeVerify'

import EmailVerificationController from './Http/Controllers/EmailVerificationController'
import LoginController from './Http/Controllers/LoginController'
import LogoutController from './Http/Controllers/LogoutController'
import PasswordController from './Http/Controllers/PasswordController'
import RegisterController from './Http/Controllers/RegisterController'
import Route from '../Http/Router/Route'

export default class AuthService

	static def beforeLogin callback\function
		BeforeLogin.beforeLogin callback

		self

	static def beforeLogout callback\function
		BeforeLogout.beforeLogout callback

		self

	static def beforeRegister callback\function
		BeforeRegister.beforeRegister callback

		self

	static def beforeVerify callback\function
		BeforeVerify.beforeVerify callback

		self

	static def beforeResend callback\function
		BeforeResend.beforeResend callback

		self

	static def beforeForgot callback\function
		BeforeForgot.beforeForgot callback

		self

	static def beforeReset callback\function
		BeforeReset.beforeReset callback

		self

	static def onLogin callback\function
		LoginController.onLogin callback

		self

	static def onLogout callback\function
		LogoutController.onLogout callback

		self

	static def onRegister callback\function
		RegisterController.onRegister callback

		self

	static def onForgot callback\function
		PasswordController.onForgot callback

		self

	static def onReset callback\function
		PasswordController.onReset callback

		self

	static def onAuthenticated callback\function
		Driver.onAuthenticated callback

		self

	static def onFetchAuthenticated callback\function
		PersonalAccessToken.onFetchAuthenticated callback

		self

	static def onSessionDestroyed callback\function
		Driver.onSessionDestroyed callback

		self

	static def onSuccessfulAttempt callback\function
		Driver.onSuccessfulAttempt callback

		self

	static def onCreateUser callback\function
		Driver.onCreateUser callback

		self

	static def onRegistered callback\function
		Driver.onRegistered callback

		self

	static def onVerification callback\function
		EmailVerificationController.onVerification callback

		self

	static def onEmailResend callback\function
		EmailVerificationController.onEmailResend callback

		self

	static def onEmailVerified callback\function
		Driver.onEmailVerified callback

		self

	static def onRequestEmailVerificationUrl callback\function
		Driver.onRequestEmailVerificationUrl callback

		self

	static def onRequestForgotPasswordUrl callback\function
		Driver.onRequestForgotPasswordUrl callback

		self

	static def onUpdatePassword callback\function
		Driver.onUpdatePassword callback

		self

	static def verificationMailer mailer\Mailable
		Driver.verificationMailer mailer

		self

	static def resetPasswordMailer mailer\Mailable
		Driver.resetPasswordMailer mailer

		self

	static def routes config\object = {}
		const login    = config.login ? config.login : true
		const register = config.register ? config.register : true
		const logout   = config.logout ? config.logout : true
		const email    = config.email ? config.email : true
		const password = config.password ? config.password : true

		if config.protocol
			const protocol = config.protocol

			BeforeResend._params = [protocol]
			BeforeForgot._params = [protocol]
			BeforeLogin._params = [protocol]
			BeforeLogout._params = [protocol]
			BeforeRegister._params = [protocol]
			BeforeReset._params = [protocol]
			BeforeVerify._params = [protocol]

		if login === true
			Route.post('login', [LoginController, 'login']).middleware(['guest', BeforeLogin]).name('login')

		if register === true
			Route.post('register', [RegisterController, 'register']).middleware(['guest', BeforeRegister]).name('register')

		if logout === true
			Route.post('logout', [LogoutController, 'logout']).middleware(['auth', BeforeLogout]).name('logout')

		if email === true
			Route.post('email/verify', [EmailVerificationController, 'verify']).name('email.verify').middleware(['signed', BeforeVerify])
			Route.post('email/resend', [EmailVerificationController, 'resend']).name('email.resend').middleware([BeforeResend])

		if password === true
			Route.post('password/forgot', [PasswordController, 'forgot']).middleware(['guest', BeforeForgot]).name('password.forgot')
			Route.post('password/reset', [PasswordController, 'reset']).middleware(['signed', 'guest', BeforeReset]).name('password.reset')
