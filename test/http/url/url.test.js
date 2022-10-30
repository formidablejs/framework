const { default: URL } = require('../../../lib/Http/URL/URL');
const { default: Route } = require('../../../lib/Http/Router/Route');
const { default: MissingRouteParamException } = require('../../../lib/Http/URL/Exceptions/MissingRouteParamException');


describe('src/Http/URL/URL', () => {
    beforeAll(() => {
        URL.setSecret('random-secret')
        Route.get('url-test', () => {}).name('cool-name')
        Route.get('url-test-2/:id', () => {}).name('another-cool-name')
    })

    it('should generate a url from path', () => {
        expect(URL.path('/url-test'))
            .toBe('/url-test')

        expect(URL.path('/url-test', { name: 'Donald' }))
            .toBe('/url-test?name=Donald')

    })

    it('should generate a query string', () => {
        expect(URL.toQuery({ name: 'Donald', framework: 'Formidable' }))
            .toBe('name=Donald&framework=Formidable')
    })

    it('should generate a url from route', () => {
        expect(URL.route('cool-name'))
            .toBe('/url-test')

        expect(URL.route('cool-name', null, { name: 'Donald' }))
            .toBe('/url-test?name=Donald')

        expect(URL.route('another-cool-name', { id: 1 }))
            .toBe('/url-test-2/1')

        expect(URL.route('another-cool-name', { id: 23 }, { name: 'Don' }))
            .toBe('/url-test-2/23?name=Don')

        expect(() => {
            URL.route('another-cool-name')
        }).toThrow(MissingRouteParamException)
    })

    it('should sign route url\'s', async () => {
        const test1 = await URL.signedRoute('cool-name')

        expect(test1)
            .toContain('/url-test?signature=')

        const test2 = await URL.signedRoute('cool-name', null, { name: 'Donald' })

        expect(test2)
            .toContain('/url-test?name=Donald&signature=')

        const test3 = await URL.signedRoute('another-cool-name', { id: 1 })

        expect(test3)
            .toContain('/url-test-2/1?signature=')

        const test4 = await URL.signedRoute('another-cool-name', { id: 23 }, { name: 'Don' })

        expect(test4)
            .toContain('/url-test-2/23?name=Don&signature=')
    })

    it('should temporarily sign route url\'s', async () => {
        const test1 = await URL.temporarySignedRoute('cool-name', '1 hour')

        expect(test1)
            .toContain('/url-test?signature=')

        const test2 = await URL.temporarySignedRoute('cool-name', '1 hour', null, { name: 'Donald' })

        expect(test2)
            .toContain('/url-test?name=Donald&signature=')

        const test3 = await URL.temporarySignedRoute('another-cool-name', '1 hour',  { id: 1 })

        expect(test3)
            .toContain('/url-test-2/1?signature=')

        const test4 = await URL.temporarySignedRoute('another-cool-name', '1 hour', { id: 23 }, { name: 'Don' })

        expect(test4)
            .toContain('/url-test-2/23?name=Don&signature=')
    })
})