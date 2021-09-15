const { helpers: { wildcard } } = require('../../lib');

describe('Test the wildcard helper method.', () => {

  test('Should return true', () => {
    expect(wildcard('users/1/edit', 'users/*/edit')).toBe(true);
  });

  test('Should return false', () => {
    expect(wildcard('users/1/edit', 'users/*/delete')).toBe(false);
  });

  test('Should throw an error if the value is not a valid string', () => {
    expect(() => {
      wildcard({}, '');
    }).toThrow(TypeError);
  });

  test('Should throw an error if the match is not a valid string', () => {
    expect(() => {
      wildcard('users/1', {});
    }).toThrow(TypeError);
  });

  test('Should throw an error if the string and match are not a valid strings', () => {
    expect(() => {
      wildcard({}, {});
    }).toThrow(TypeError);
  });

});