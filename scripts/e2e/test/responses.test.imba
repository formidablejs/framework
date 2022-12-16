const { SuperTest } = require 'supertest'
const request = require 'supertest'

describe 'Responses', do
	# @type {SuperTest}
	let app

	beforeAll do app = request 'http://localhost:3000'

	it '/json-response (GET)', do
		app.get('/json-response')
			.expect(201)
			.expect({
				message: "Hello world"
			})
