const { SuperTest } = require 'supertest'
const request = require 'supertest'

describe 'Database', do
	# @type {SuperTest}
	let app

	beforeAll do app = request 'http://localhost:3000'

	it '/ (POST: Create User)', do
		app.post('/register')
			.send({
				name: 'Donald'
				email: 'test@example.com'
				password: 'password'
				password_confirmation: 'password'
			})
			.expect(200)

	it '/ (POST: Login - success)', do
		app.post('/login')
			.send({
				email: 'test@example.com'
				password: 'password'
			})
			.expect(200)

	it '/ (POST: Login - failure)', do
		app.post('/login')
			.send({
				email: 'test@example.com'
				password: 'password1'
			})
			.expect(422)
