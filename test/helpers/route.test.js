const Route = require('../../lib/Http/Router/Route').default;
const { helpers: { route } } = require('../../lib');

describe('Test the route helper method.', () => {
    beforeAll(() => {
        Route.get('url-test', () => {}).name('cool-name')
    })

    test('Should create a URL from a route name', () => {
        expect(route('cool-name')).toBe('/url-test');
    });
});