const formidable = require('../.formidable/build').default
const supertest = require('supertest')

describe 'Application (e2e)', do
	let app

	beforeAll do
		const application = await formidable

		app = application.fastify()

		await app.ready()

	afterAll do
		await app.close()

	it '/ (GET: Welcome)', do
		supertest(app.server)
			.get('/')
			.expect(200)
			.expect(do(res)
				expect(res.text).toContain('Your app is ready with Auth scaffolding')
			)
