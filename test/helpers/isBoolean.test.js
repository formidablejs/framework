const { helpers: { isBoolean } } = require('../../lib');

describe('Test the isBoolean helper method.', () => {

  test('Should return true if object is boolean', () => {
    expect(isBoolean(true)).toBe(true);
  });

  test('Should return false if object is not a boolean', () => {
    expect(isBoolean({})).toBe(false);
  });

});