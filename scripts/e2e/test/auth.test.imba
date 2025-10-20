jest.mock '@paralleldrive/cuid2'

const formidable = require('../.formidable/build').default
const supertest = require('supertest')

describe 'Auth', do
	let app

	beforeAll do
		const application = await formidable

		app = application.fastify()

		await app.ready()

	afterAll do
		await app.close()

	it '/ (POST: Create User)', do
		supertest(app.server)
			.post('/register')
			.send({
				name: 'Donald'
				email: 'test@example.com'
				password: 'password'
				password_confirmation: 'password'
			})
			.expect(200)

	it '/ (POST: Login - success)', do
		supertest(app.server)
			.post('/login')
			.send({
				email: 'test@example.com'
				password: 'password'
			})
			.expect(200)

	it '/ (POST: Login - failure)', do
		supertest(app.server)
			.post('/login')
			.send({
				email: 'test@example.com'
				password: 'password1'
			})
			.expect(422)
