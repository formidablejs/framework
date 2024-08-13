import DriverManager from './DriverManager'

export default class Authorize

	def constructor user
		self._user = user

	static def user user
		new self(user)

	def on protocol
		self._protocol = protocol

		self

	def using request
		self._request = request

		self

	def for duration, abilities = ['*']
		let provider = 'manual'

		try
			provider = this._request.config.get "auth.protocols.{protocol}.provider"

		const date = new Date()
		const ttl = new Date(date.valueOf() + this._request.config.get('session.lifetime', duration))

		self.getDriver().attempt("auth:{provider}", this._user, ttl.valueOf(), abilities)

	def getDriver
		DriverManager.get(this._protocol, this._request, this._request.reply, null, this._request.config)
