jest.mock '@paralleldrive/cuid2'

const formidable = require('../.formidable/build').default
const supertest = require('supertest')

describe 'Responses', do
	let app

	beforeAll do
		const application = await formidable

		app = application.fastify()

		await app.ready()

	afterAll do
		await app.close()

	it '/json-response (GET)', do
		supertest(app.server)
			.get('/json-response')
			.expect(201)
			.expect({
				message: "Hello world"
			})
