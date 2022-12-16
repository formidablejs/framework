const { SuperTest } = require 'supertest'
const request = require 'supertest'

describe 'Validation', do
	# @type {SuperTest}
	let app

	beforeAll do app = request 'http://localhost:3000'

	it '/ (PUT: Create Post: throw 422) - no body', do
		app.put('/posts')
			.send()
			.expect(422)

	it '/ (PUT: Create Post: throw 422) - min error', do
		app.put('/posts')
			.send({ body: 'str' })
			.expect(422)
