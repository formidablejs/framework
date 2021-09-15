const { helpers: { isClass } } = require('../../lib');

describe('Test the isClass helper method.', () => {

  test('Should return true if object is a class', () => {
    const UserController = class UserController {};

    expect(isClass(UserController)).toBe(true);
  });

  test('Should return false if object is not a class', () => {
    expect(isClass({})).toBe(false);
  });

});