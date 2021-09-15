const { helpers: { config } } = require('../../lib');
const { default: ConfigNotCachedError } = require('../../lib/Support/Helpers/Error/ConfigNotCachedError');

describe('Test the config helper method.', () => {

  test('Should throw an error if the config is not cached', () => {
    expect(() => {
      config('app.name')
    }).toThrow(ConfigNotCachedError);
  });

});