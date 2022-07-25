const { current } = require('../storage/framework/address.json');
const request = require('supertest');

describe('Application (e2e)', () => {
	let app;

	beforeAll(() => app = request(current));

	it('/ (GET: Welcome)', async () => {
		const response = await app.get('/')

		expect(response.status).toEqual(200);
		expect(response.text).toContain('Yey! You have successfully created a new Formidable project.');
	});
});
