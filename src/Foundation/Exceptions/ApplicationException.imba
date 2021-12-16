class ApplicationException < Error
	prop response
	prop status

	def constructor response\any, status\Number = 500
		super()

		this.response = response
		this.status = status

		this.initMessage!
		this.initName!

	def initMessage
		if this.response !== undefined && this.response !== null
			this.message = this.response

		elif this.response.constructor.name
			this.message = this.response.constructor.name
				.match(/[A-Z][a-z]+|[0-9]+/g)
				.join(' ')

	def initName
		this.name = this.constructor.name

	def getStatus
		this.status

export default ApplicationException
