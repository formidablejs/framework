const { default: Redirect } = require('../../../lib/Http/Redirect/Redirect');
const { default: Route } = require('../../../lib/Http/Router/Route');

describe('src/Http/Redirect/Redirect', () => {
    it('should instantiate a new Redirect instance', () => {
        expect(Redirect.to('/home'))
            .toBeInstanceOf(Redirect)

        expect(Redirect.back())
            .toBeInstanceOf(Redirect)
    })

    it('should fetch path from route', () => {
        Route.get('random-path', () => {}).name('redirect-name')

        expect(Redirect.route('redirect-name'))
            .toHaveProperty('path', '/random-path')
    })

    it('should set status code', () => {
        expect(Redirect.to('/user').code(201))
            .toHaveProperty('statusCode', 201)
    })

    it('should flash data', () => {
        expect(Redirect.to('/home').with('name', 'Donald'))
            .toHaveProperty('_flashed.name', 'Donald')
    })

    it('should test flash feature', () => {
        const redirect = Redirect.to('/home').with('name', 'Donald')

        expect(redirect)
            .toHaveProperty('_flashed.name', 'Donald')

        expect(redirect.flashed())
            .toStrictEqual({
                name: 'Donald'
            })

        expect(redirect.hasFlash())
            .toBeTruthy()

        expect(Redirect.to('/home').hasFlash())
            .toBeFalsy()
    })
})