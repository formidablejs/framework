const { default: DecryptException } = require('../../lib/Foundation/Exceptions/DecryptException');
const { default: Encrypter } = require('../../lib/Foundation/Encrypter');
const crypto = require('crypto');

/**
 * Generate app key.
 *
 * @returns {String}
 */
const getKey = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
  let key = '';
  for (let i = 0; i < 32; i++) {
    key += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return 'base64:' + Buffer.from(key + ':' + crypto.randomBytes(8).toString('hex')).toString('base64');
}

describe('src/Encrypter/Encrypter', () => {
  beforeAll(() => {
    Encrypter.configure({
      algorithm: 'AES-256-CBC',
      appKey: getKey()
    });
  });

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
