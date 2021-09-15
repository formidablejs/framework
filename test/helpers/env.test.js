const { helpers: { env } } = require('../../lib');

describe('Test the env helper method.', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };

    // Set environment variable.
    process.env.APP_NAME = 'Formidable';
  });

  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
  });

  test('Should return Formidable', () => {
    expect(env('APP_NAME')).toBe('Formidable');
  });

  test('Should return null if env is not present', () => {
    expect(env('RANDOM_ENV_NAME')).toBe(null);
  });

  test('Should return default "Formidable" if env is not present', () => {
    expect(env('RANDOM_ENV_NAME', 'Formidable')).toBe('Formidable');
  });

  test('Should throw an error if the env key is not a valid string', () => {
    expect(() => {
      env({});
    }).toThrow(TypeError);
  });

});