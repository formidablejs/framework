const path = require('path');
const { default: Repository } = require('../../lib/Environment/Repository')

describe('src/Environment/Repository', () => {
  /**
   * @var {Repository}
   */
  let environment;

  beforeAll(() => {
    environment = new Repository(path.resolve(__dirname));
  });

  afterAll(() => {
    environment = null
  });

  it('Should return "Formidable"', () => {
    expect(environment.get('APP_NAME')).toBe('Formidable')
  })

  it('Should return "null"', () => {
    expect(environment.get('RANDOM_ENV_NAME')).toBe(null)
  });

});