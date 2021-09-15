const { helpers: { dotNotation } } = require('../../lib');

const object = {
  test: {
    string: 'Hello world'
  }
};

describe('Test the dotNotation helper method', () => {

  test('Should return Hello world', () => {
    expect(dotNotation(object, 'test.string')).toBe('Hello world');
  });

  test('Should return null if the key does not exist', () => {
    expect(dotNotation(object, 'test.string2')).toBe(null);
  });

  test('Should throw an error if the object is not a valid object', () => {
    expect(() => {
      dotNotation(null, 'test.string');
    }).toThrow(TypeError);
  });

  test('Should throw an error if the key is not a valid string notation', () => {
    expect(() => {
      dotNotation(object, null);
    }).toThrow(TypeError);
  });

});