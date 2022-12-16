const { current } = require '../storage/framework/address.json'
const { SuperTest } = require 'supertest'
const request = require 'supertest'

describe 'Responses', do
	# @type {SuperTest}
	let app

	beforeAll do app = request current

	it '/json-response (GET)', do
		app.get('/json-response')
			.expect(201)
			.expect({
				message: "Hello world"
			})
