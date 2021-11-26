const { Application, request } = require('../.formidable/server.app');
const { helpers: { config } } = require('@formidablejs/framework');
const { send } = require('process');

/**
 * Skip if not in testing environment
 */
const maybe = config('app.env') === 'testing'
	? describe
	: describe.skip

maybe('Application (e2e)', () => {
	let app;

	beforeAll(async () => {
		await Application.then((formidable) => {
			(app = formidable.fastify()).ready();
		});
	});

	afterAll(async () => await app.close());

	it('/ (GET: Hello World)', () => {
		return request(app.server)
			.get('/')
			.set('Accept-Language', 'en')
			.expect(200)
			.expect('Hello World');
	});

	it('/ (GET: Hola Mundo)', () => {
		return request(app.server)
			.get('/')
			.set('Accept-Language', 'es')
			.expect(200)
			.expect('Hola Mundo');
	});

	it('/ (PUT: Create Post: throw 422) - no body', () => {
		return request(app.server)
			.put('/posts')
			.send()
			.expect(422);
	});

	it('/ (PUT: Create Post: throw 422) - min error', () => {
		return request(app.server)
			.put('/posts')
			.send({ body: 'str' })
			.expect(422);
	});

	it('/ (PUT: Create Post)', () => {
		return request(app.server)
			.put('/posts')
			.send({ body: 'hello world' })
			.expect(200);
	});

	it('/ (GET: Fetch all posts)', () => {
		return request(app.server)
			.get('/posts')
			.expect(200);
	});

	it('/ (GET: Fetch 1 post)', () => {
		return request(app.server)
			.get('/posts/1')
			.expect(200);
	});

	it('/ (GET: Fetch 1 post) - throw error', () => {
		return request(app.server)
			.get('/posts/100000')
			.expect(404);
	});
})
