const { current } = require '../storage/framework/address.json'
const { SuperTest } = require 'supertest'
const request = require 'supertest'

describe 'Language', do
	# @type {SuperTest}
	let app

	beforeAll do app = request('http://127.0.0.1:3000')

	it '/ (GET: Hello World)', do
		app.set('Accept-Language', 'en')
			.get('/')
			.expect(200)
			.expect('Hello World')

	it '/ (GET: Hola Mundo)', do
		app.set('Accept-Language', 'es')
			.get('/')
			.expect(200)
			.expect('Hola Mundo')
