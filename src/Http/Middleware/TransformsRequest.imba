export default class TransformsRequest

	get except
		[

		]

	def handle request
		this.clean request

	def clean request
		if (request.request.body && request.request.body.constructor === ({}).constructor)
			let results = []
			for key in Object.keys(request.request.body)
				let value = request.request.body[key]
				if except.includes(key) == false
					value = transform(key, request.input(key))
				results.push({ [key]: value })

			let output = {}

			try
				output = Object.assign(...results)

			request.request.body = output

	def transform key, value
		value
