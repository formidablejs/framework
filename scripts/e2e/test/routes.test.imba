const { current } = require '../storage/framework/address.json'
const { SuperTest } = require 'supertest'
const request = require 'supertest'

describe 'Routes', do
	# @type {SuperTest}
	let app

	beforeAll do app = request('http://127.0.0.1:3000')

	it '/ (GET: hello)', do
		app.get('/routes/invoke')
			.expect(200)
			.expect('hello')

	it '/ (GET: hello)', do
		app.get('/routes/function')
			.expect(200)
			.expect('hello')
