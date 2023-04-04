const Hash = require('../../lib/Hashing/Hash').default;

describe('src/Hashing/Hash (bcrypt)', () => {
    const Instance = Hash

    beforeAll(() => {
        Instance.configure({
            driver: 'bcrypt',
            bcrypt: {
                rounds: 10
            },
            argon2: {
                memoryCost: 1024,
                timeCost: 3,
                parallelism: 2
            }
        })
    })

    afterAll(() => {
        Instance.reset()
    })

    it('Should create a hash', async () => {
        const hash = await Instance.make('password');

        return expect(hash).not.toBe('password');
    })

    it('Should check a hash', async () => {
        const hash = await Instance.make('password');
        const status = await Instance.check('password', hash);

        return expect(status).toBe(true);
    })
})

describe('src/Hashing/Hash (argon2)', () => {
    const Instance = Hash;

    beforeAll(() => {
        Instance.configure({
            driver: 'argon2',
            bcrypt: {
                rounds: 10
            },
            argon2: {
                memoryCost: 1024,
                timeCost: 3,
                parallelism: 2
            }
        })
    })

    afterAll(() => {
        Instance.reset()
    })

    it('Should create a hash', async () => {
        const hash = await Instance.make('password');

        return expect(hash).not.toBe('password');
    })

    it('Should check a hash', async () => {
        const hash = await Instance.make('password');
        const status = await Instance.check('password', hash);

        return expect(status).toBe(true);
    })
})
