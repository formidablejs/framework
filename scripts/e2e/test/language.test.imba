const { SuperTest } = require 'supertest'
const request = require 'supertest'

describe 'Language', do
	# @type {SuperTest}
	let app

	beforeAll do app = request 'http://localhost:3000'

	it '/ (GET: Hello World)', do
		app.get('/')
			.set('Accept-Language', 'en')
			.expect(200)
			.expect('Hello World')

	it '/ (GET: Hola Mundo)', do
		app.get('/')
			.set('Accept-Language', 'es')
			.expect(200)
			.expect('Hola Mundo')
