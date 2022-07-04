const Redis = require('../../lib/Redis/Redis').default;
const Config = require('./setup/Config');

describe('src/Redis/Redis', () => {
    const redis = Redis;

    beforeAll(() => {
        redis.configure(new Config);
    });

    afterAll(() => {
        redis.closeAll();
    });

    it('Should set a value', async () => {
        const status = await redis.set('name', 'Donald');

        return expect(status).toBe('OK');
    });

    it('Should get a value', async () => {
        const value = await redis.get('name');

        return expect(value).toBe('Donald');
    });
});
