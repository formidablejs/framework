const { helpers: { slug } } = require('../../lib');

describe('Test the slug helper method.', () => {
  test('Should return hello-world', () => {
    expect(slug('hello world')).toBe('hello-world');
  });

  test('Should throw an error if the value is not a valid string', () => {
    expect(() => {
      slug({});
    }).toThrow(TypeError);
  });

  test('Should throw an error if the separator value is not a valid string', () => {
    expect(() => {
      slug('hello world', {});
    }).toThrow(TypeError);
  });

});