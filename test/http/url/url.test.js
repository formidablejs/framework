const URL = require('../../../lib/Http/URL/URL').default;
const Route = require('../../../lib/Http/Router/Route').default;
const MissingRouteParamException = require('../../../lib/Http/URL/Exceptions/MissingRouteParamException').default;

describe('src/Http/URL/URL', () => {
    beforeAll(() => {
        URL.setSecret('random-secret')
        Route.get('url-test', () => {}).name('cool-name')
        Route.get('url-test-2/:id', () => {}).name('another-cool-name')
    })

    it('Should create a URL from a route name', () => {
        const url = URL.route('cool-name')

        expect(url).toBe('/url-test')
    })

    it('Should create a URL from a route name with params', () => {
        const url = URL.route('another-cool-name', { id: 1 })

        expect(url).toBe('/url-test-2/1')
    })

    it('Should create a URL from a route name with query', () => {
        const url = URL.route('cool-name', { page: 1 })
        const url2 = URL.route('cool-name', { page: 1, _query: { filter_by: 'title' } })
        const url3 = URL.route('cool-name', { _query: { page: 1, filter_by: 'title' } })

        expect(url).toBe('/url-test?page=1')
        expect(url2).toBe('/url-test?page=1&filter_by=title')
        expect(url3).toBe('/url-test?page=1&filter_by=title')
    })

    it('Should create a URL from a route name with params and query', () => {
        const url = URL.route('another-cool-name', { id: 1, page: 1 })
        const url2 = URL.route('another-cool-name', { id: 1, _query: { page: 1, filter_by: 'title' } })

        expect(url).toBe('/url-test-2/1?page=1')
        expect(url2).toBe('/url-test-2/1?page=1&filter_by=title')
    })

    it('Should create a signed URL from a route name', async () => {
        const url = await URL.signedRoute('cool-name')

        expect(url).toContain('/url-test?signature=')
    })

    it('Should create a temporarily signed URL from a route name', async () => {
        const url = await URL.temporarySignedRoute('cool-name', '1h')

        expect(url).toContain('/url-test?signature=')
    })

    it('Should create a temporarily signed URL from path', async () => {
        const url = await URL.temporarySigned('subscriptions', '1h')

        expect(url).toContain('/subscriptions?signature=')
    })

    it('Should create a URL from a path', () => {
        const url = URL.path('/url-test')
        const url2 = URL.path('url-test', { page: 1 })

        expect(url).toBe('/url-test')
        expect(url2).toBe('/url-test?page=1')
    })

    it('Should throw an exception when a route param is missing', () => {
        expect(() => URL.route('another-cool-name')).toThrow(MissingRouteParamException)
    })
})
