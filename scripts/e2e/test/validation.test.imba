const formidable = require('../.formidable/build').default
const supertest = require('supertest')

describe 'Validation', do
	let app

	beforeAll(async () => {
		const application = await formidable

		app = application.fastify()

		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it '/ (PUT: Create Post: throw 422) - no body', do
		supertest(app.server)
			.put('/posts')
			.send()
			.expect(422)

	it '/ (PUT: Create Post: throw 422) - min error', do
		supertest(app.server)
			.put('/posts')
			.send({ body: 'str' })
			.expect(422)
