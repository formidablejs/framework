const { helpers: { asObject } } = require('../../lib');

describe('Test the asObject helper method.', () => {
  test('Should return true if custom object can be casted as an object', () => {
    const user = {
      name: 'Donald'
    };

    expect(asObject(user)).toEqual({
      name: 'Donald'
    });
  });
});