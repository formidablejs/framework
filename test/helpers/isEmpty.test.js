const { helpers: { isEmpty } } = require('../../lib');

describe('Test the isEmpty helper method.', () => {

  test('Should return true if value null or undefined', () => {
    expect(isEmpty()).toBe(true);
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty(undefined)).toBe(true);
  });

  test('Should return true if string is empty', () => {
    expect(isEmpty(' ')).toBe(true);
    expect(isEmpty('')).toBe(true);
  });

  test('Should return true if number is 0', () => {
    expect(isEmpty(0)).toBe(true);
    expect(isEmpty('0')).toBe(true);
  });

  test('Should return true if array length is 0', () => {
    expect(isEmpty([])).toBe(true);
  });

  test('Should return true if object keys length is 0', () => {
    expect(isEmpty({})).toBe(true);
  });

  test('Should return false', () => {
    expect(isEmpty('Hello World')).toBe(false);
    expect(isEmpty([ 'Luna' ])).toBe(false);
    expect(isEmpty({ name: 'Luna' })).toBe(false);
    expect(isEmpty(2)).toBe(false);
    expect(isEmpty(true)).toBe(false);
  });

});
