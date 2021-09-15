const { helpers: { isArray } } = require('../../lib');

describe('Test the isArray helper method.', () => {

  test('Should return true if object is an array', () => {
    expect(isArray([])).toBe(true);
  });

  test('Should return false if object is not an array', () => {
    expect(isArray({})).toBe(false);
  });

});