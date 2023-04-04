const URL = require('../../lib/Http/URL/URL').default;
const Route = require('../../lib/Http/Router/Route').default;
const { helpers: { temporarySignedRoute } } = require('../../lib');

describe('Test the temporarySignedRoute helper method.', () => {
    beforeAll(() => {
        URL.setSecret('random-secret')
        Route.get('url-test', () => {}).name('cool-name')
    })

    test('Should create a temporarily signed URL from a route name', async () => {
        const url = await temporarySignedRoute('cool-name', '1 minute');

        expect(url).toContain('/url-test?signature=');
    });
});