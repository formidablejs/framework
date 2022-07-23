const { current } = require '../storage/framework/address.json';
const { SuperTest } = require 'supertest';
const request = require 'supertest';

describe('Application (e2e)', () => {
	let app: SuperTest;

	beforeAll(() => app = request(current));

	it('/ (GET: Hello World)', () => {
		app.get('/')
			.set('Accept-Language', 'en')
			.expect(200)
			.expect('Hello World');
	});

	it('/ (GET: Hola Mundo)', () => {
		app.get('/')
			.set('Accept-Language', 'es')
			.expect(200)
			.expect('Hola Mundo')
	});
});
