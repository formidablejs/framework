module.exports = class TransformsRequest

	get except
		[

		]

	def handle request
		this.clean request

	def clean request
		if (request.request.body && request.request.body.constructor === ({}).constructor)
			const results = Object.keys(request.request.body).map do(key)
				let value = request.request.body[key]

				if except.includes(key) == false
					value = transform(key, request.input(key))

				{
					[key]: value
				}

			let output = {}

			try
				output = Object.assign(...results)

			request.request.body = output

	def transform key, value
		value
