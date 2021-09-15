const { helpers: { without } } = require('../../lib');

const task = {
  id: 1,
  body: 'Run tests'
};

describe('Test the without helper method.', () => {

  test('Should return true', () => {
    expect(without(task, [ 'id' ])).toEqual({ 'body': 'Run tests' });
  });

  test('Should throw an error if the object value is not a object', () => {
    expect(() => {
      without('', [ 'id' ]);
    }).toThrow(TypeError);
  });

  test('Should throw an error if the exclude value is not an array', () => {
    expect(() => {
      without(task, 1);
    }).toThrow(TypeError);
  });

  test('Should throw an error if the exclude value is not an array or if the object value is not a valid object', () => {
    expect(() => {
      without('task', 1);
    }).toThrow(TypeError);
  });

});