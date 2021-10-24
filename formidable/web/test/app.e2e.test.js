const { request } = require('../.formidable/server.app');
const { helpers: { config } } = require('@formidablejs/framework');
const { SuperTest, Response } = require('supertest');

describe('Application (e2e)', () => {
	/** @type {SuperTest} */
	let app;

	beforeAll(() => {
		app = request(config('app.url'));
	});

	it('/ (GET: Welcome)', async () => {
		/** @type {Response} */
		const response = await app.get('/');

		expect(response.status).toEqual(200);
		expect(response.text).toContain('Yey! You have successfully created a new Formidable project.');
	});
})
