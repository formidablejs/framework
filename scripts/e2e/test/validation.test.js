const { Application, request } = require('../.formidable/server.app');
const { helpers: { config } } = require('@formidablejs/framework');

/**
 * Skip if not in testing environment
 */
const maybe = config('app.env') === 'testing'
	? describe
	: describe.skip

maybe('Validation', () => {
	let app;

	beforeAll(async () => {
		await Application.then((formidable) => {
			(app = formidable.fastify()).ready();
		});
	});

	afterAll(async () => await app.close());

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
});
