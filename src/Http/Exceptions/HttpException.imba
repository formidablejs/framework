class HttpException < Error
	prop response
	prop status = 400

	def constructor response\String
		super!

		this.response = response

		this.initMessage!
		this.initName!

	def initMessage
		if this.response !== undefined && this.response !== null
			this.message = this.response

		elif this.response !== undefined && this.response !== null && this.response.constructor.name
			this.message = this.response.constructor.name
				.match(/[A-Z][a-z]+|[0-9]+/g)
				.join(' ')

	def initName
		this.name = this.constructor.name

	def getStatus
		this.status

module.exports = HttpException
