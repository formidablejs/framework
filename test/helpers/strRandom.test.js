const { helpers: { strRandom } } = require('../../lib');

describe('Test the strRandom helper method.', () => {
  test('Should return a 8 char string', () => {
    expect(strRandom()).toHaveLength(8);
  });

  test('Should return a 40 char string', () => {
    expect(strRandom(40)).toHaveLength(40);
  });

  test('Should throw an error if the length is not a valid number', () => {
    expect(() => {
      strRandom('foo');
    }).toThrow(TypeError);
  });

  test('Should throw an error if the length is not divisible by 2', () => {
    expect(() => {
      strRandom(3);
    }).toThrow(RangeError);
  });
});