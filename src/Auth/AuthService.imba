const { Mailable } = require '@formidablejs/mailer'
const Driver = require './Drivers/Driver'

const BeforeForgot = require './Http/Middleware/BeforeForgot'
const BeforeLogin = require './Http/Middleware/BeforeLogin'
const BeforeLogout = require './Http/Middleware/BeforeLogout'
const BeforeRegister = require './Http/Middleware/BeforeRegister'
const BeforeResend = require './Http/Middleware/BeforeResend'
const BeforeReset = require './Http/Middleware/BeforeReset'
const BeforeVerify = require './Http/Middleware/BeforeVerify'

const EmailVerificationController = require './Http/Controllers/EmailVerificationController'
const LoginController = require './Http/Controllers/LoginController'
const LogoutController = require './Http/Controllers/LogoutController'
const PasswordController = require './Http/Controllers/PasswordController'
const RegisterController = require './Http/Controllers/RegisterController'
const Route = require '../Http/Router/Manager'

module.exports = class AuthService

	static def beforeLogin callback\Function
		BeforeLogin.beforeLogin callback

		self

	static def beforeLogout callback\Function
		BeforeLogout.beforeLogout callback

		self

	static def beforeRegister callback\Function
		BeforeRegister.beforeRegister callback

		self

	static def beforeVerify callback\Function
		BeforeVerify.beforeVerify callback

		self

	static def beforeResend callback\Function
		BeforeResend.beforeResend callback

		self

	static def beforeForgot callback\Function
		BeforeForgot.beforeForgot callback

		self

	static def beforeReset callback\Function
		BeforeReset.beforeReset callback

		self

	static def onLogin callback\Function
		LoginController.onLogin callback

		self

	static def onRegister callback\Function
		RegisterController.onRegister callback

		self

	static def onForgot callback\Function
		PasswordController.onForgot callback

		self

	static def onReset callback\Function
		PasswordController.onReset callback

		self

	static def onAuthenticated callback\Function
		Driver.onAuthenticated callback

		self

	static def onRegistered callback\Function
		Driver.onRegistered callback

		self

	static def onVerification callback\Function
		EmailVerificationController.onVerification callback

		self

	static def onEmailResend callback\Function
		EmailVerificationController.onEmailResend callback

		self

	static def verificationMailer mailer\Mailable
		Driver.verificationMailer mailer

		self

	static def resetPasswordMailer mailer\Mailable
		Driver.resetPasswordMailer mailer

		self

	static def routes config\Object = {}
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
