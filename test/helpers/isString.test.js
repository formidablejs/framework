const { helpers: { isString } } = require('../../lib');

describe('Test the isString helper method.', () => {

  test('Should return true if object is a valid string', () => {
    expect(isString('Hello world')).toBe(true);
  });

  test('Should return false if object is not a valid string', () => {
    expect(isString(null)).toBe(false);
  });

});