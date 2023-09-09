const formidable = require('../.formidable/build').default
const supertest = require('supertest')

describe 'Database', do
	let app

	beforeAll do
		const application = await formidable

		app = application.fastify()

		await app.ready()

	afterAll do
		await app.close()

	it '/ (PUT: Create Post)', do
		supertest(app.server)
			.put('/posts')
			.send({ body: 'hello world' })
			.expect(200)

	it '/ (GET: Fetch all posts)', do
		supertest(app.server)
			.get('/posts')
			.expect(200)

	it '/ (GET: Fetch 1 post)', do
		supertest(app.server)
			.get('/posts/1')
			.expect(200)

	it '/ (GET: Fetch 1 post) - throw error', do
		supertest(app.server)
			.get('/posts/100000')
			.expect(404)
