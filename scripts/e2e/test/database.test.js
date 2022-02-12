const { Application, request } = require('../.formidable/server.app');
const { helpers: { config } } = require('@formidablejs/framework');

/**
 * Skip if not in testing environment
 */
const maybe = config('app.env') === 'testing'
	? describe
	: describe.skip

maybe('Database', () => {
	let app;

	beforeAll(async () => {
		await Application.then((formidable) => {
			(app = formidable.fastify()).ready();
		});
	});

	afterAll(async () => await app.close());

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
});
