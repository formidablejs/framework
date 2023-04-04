const URL = require('../../lib/Http/URL/URL').default;
const Route = require('../../lib/Http/Router/Route').default;
const { helpers: { signedRoute } } = require('../../lib');

describe('Test the signedRoute helper method.', () => {
    beforeAll(() => {
        URL.setSecret('random-secret')
        Route.get('url-test', () => {}).name('cool-name')
    })

    test('Should create a signed URL from a route name', async () => {
        const url = await signedRoute('cool-name');

        expect(url).toContain('/url-test?signature=');
    });
});