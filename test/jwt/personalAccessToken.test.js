const Database = require('./setup/Database');
const Config = require('./setup/Config');
const { default: PersonalAccessToken } = require('../../lib/Auth/Tokens/PersonalAccessToken');

describe('src/Jwt/PersonalAccessToken', () => {
  const personalAccessToken = PersonalAccessToken;
  let jwtString = '';

  beforeAll(async () => {
    await Database.knex.migrate.latest();
    await Database.knex.seed.run();

    personalAccessToken
      .setDatabase(Database)
      .setConfig(new Config)
      .setSecret('random-secret');
  });

  afterAll(async () => {
    await Database.knex.migrate.rollback();

    await Database.knex.destroy();
  });

  it('Should create a Personal Access Token', async () => {
    jwtString = await personalAccessToken.create(
      'test',
      1,
      'users',
      ['*']
    );

    return expect(typeof jwtString)
      .toBe('string');
  });

  it('Should find Personal Access Token', async () => {
    const token = await personalAccessToken.find(jwtString)

    return expect(typeof token)
      .toBe('object');
  });

  it('Should destroy a Personal Access Token', async () => {
    return expect(await personalAccessToken.destroy(jwtString))
      .toBe(1);
  });

  it('Should verify Personal Access Token', async () => {
    const token = await personalAccessToken.verify(jwtString);

    return expect(typeof token)
      .toBe('object');
  });

  it('Should return false if Personal Access Token cannot be verified', async () => {
    const token = await personalAccessToken.verify('random-string');

    return expect(token).toBe(false);
  });

});