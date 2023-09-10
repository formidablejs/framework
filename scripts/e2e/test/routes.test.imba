const formidable = require('../.formidable/build').default
const supertest = require('supertest')

describe 'Routes', do
	let app

	beforeAll do
		const application = await formidable

		app = application.fastify()

		await app.ready()

	afterAll do
		await app.close()

	it '/ (GET: hello)', do
		supertest(app.server)
			.get('/routes/invoke')
			.expect(200)
			.expect('hello')

	it '/ (GET: hello)', do
		supertest(app.server)
			.get('/routes/function')
			.expect(200)
			.expect('hello')
