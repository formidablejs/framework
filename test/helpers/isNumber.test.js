const { helpers: { isNumber } } = require('../../lib');

describe('Test the isNumber helper method.', () => {

  test('Should return true if object is a number', () => {
    expect(isNumber(1)).toBe(true);
  });

  test('Should return false if object is not a number', () => {
    expect(isNumber({})).toBe(false);
  });

});