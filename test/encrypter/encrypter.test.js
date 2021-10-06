const { default: DecryptException } = require('../../lib/Foundation/Exceptions/DecryptException');
const Encrypter = require('./setup/Encrypter');

describe('src/Encrypter/Encrypter', () => {
  it('Should encrypt', () => {
    expect(Encrypter.encrypt('Luna')).toEqual(expect.any(String));
  });

  it('Should decrypt and return "Luna"', () => {
    const encrypted = Encrypter.encrypt('Luna');

    expect(Encrypter.decrypt(encrypted)).toEqual('Luna');
  });

  it('Should throw "DecryptException"', () => {
    expect(() => {
      Encrypter.decrypt('random-string')
    }).toThrow(DecryptException);
  });
});
