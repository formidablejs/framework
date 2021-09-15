const { helpers: { isObject } } = require('../../lib');

describe('Test the isObject helper method.', () => {

  test('Should return true if object is a valid object', () => {
    expect(isObject({})).toBe(true);
  });

  test('Should return false if object is not a valid object', () => {
    expect(isObject(null)).toBe(false);
  });

});