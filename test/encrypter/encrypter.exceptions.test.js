const { default: Encrypter } = require("../../lib/Foundation/Encrypter");
const { default: InvalidAppKeyException } = require("../../lib/Foundation/Exceptions/InvalidAppKeyException");

describe('src/Encrypter/Encrypter (Exceptions)', () => {
  it('Should throw "InvalidAppKeyException" (encrypt)', () => {
    expect(() => {
      Encrypter.encrypt('random-string')
    }).toThrow(InvalidAppKeyException);
  });

  it('Should throw "InvalidAppKeyException" (decrypt)', () => {
    expect(() => {
      Encrypter.decrypt('random-string')
    }).toThrow(InvalidAppKeyException);
  });
});
