const formidable = require('../.formidable/build').default
const supertest = require('supertest')

describe 'Language', do
	let app

	beforeAll do
		const application = await formidable

		app = application.fastify()

		await app.ready()

	afterAll do
		await app.close()

	it '/ (GET: Hello World)', do
		supertest(app.server)
			.get('/')
			.set('Accept-Language', 'en')
			.expect(200)
			.expect('Hello World')

	it '/ (GET: Hola Mundo)', do
		supertest(app.server)
			.get('/')
			.set('Accept-Language', 'es')
			.expect(200)
			.expect('Hola Mundo')
