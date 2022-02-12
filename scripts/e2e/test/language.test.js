const { Application, request } = require('../.formidable/server.app');
const { helpers: { config } } = require('@formidablejs/framework');

/**
 * Skip if not in testing environment
 */
const maybe = config('app.env') === 'testing'
	? describe
	: describe.skip

maybe('Language', () => {
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
});
