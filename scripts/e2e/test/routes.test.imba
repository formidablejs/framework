const formidable = require('../.formidable/build').default
const supertest = require('supertest')

describe 'Routes', do
	let app

	beforeAll(async () => {
		const application = await formidable

		app = application.fastify()

		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

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
