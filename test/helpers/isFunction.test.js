const { helpers: { isFunction } } = require('../../lib');

describe('Test the isFunction helper method.', () => {

  test('Should return true if object is a function', () => {
    const func = () => {
      console.log('this is a function');
    }

    expect(isFunction(func)).toBe(true);
  });

  test('Should return false if object is not a function', () => {
    expect(isFunction({})).toBe(false);
  });

});