import isObject from '../Support/Helpers/isObject'
import DecryptException from './Exceptions/DecryptException'
import config from '../Support/Helpers/config'
import crypto from 'crypto'
import InvalidEncryptionKeyTypeException from './Exceptions/InvalidEncryptionKeyTypeException'
import isEmpty from '../Support/Helpers/isEmpty'

const settings = {
	algorithm: null
	appKey: null
}

try settings.algorithm = config('app.cipher', 'AES-256-CBC')
try settings.appKey = config('app.key', new String)

export default class Encrypter

	static def configure config\Object
		if !isObject(config) then throw TypeError 'Expected an object.'

		if !isEmpty(config.algorithm)
			settings.algorithm = config.algorithm

		if !isEmpty(config.appKey)
			settings.appKey = config.appKey

		Encrypter

	static def appKey type\String
		if !isEmpty(type) && ['key', 'iv'].includes(type.toLowerCase()) == false
			throw new InvalidEncryptionKeyTypeException 'Encryption key type is not valid.'

		let key\String = config('app.key', new String)

		if key.startsWith('base64:')
			key = Buffer.from(key.split('base64:')[1], 'base64').toString('utf-8')

		if isEmpty(type) then return key

		if type.toLowerCase() == 'key' then return key.split(':')[0]

		if type.toLowerCase() == 'iv' then return key.split(':')[1]

	static def key
		self.appKey 'key'

	static def iv
		self.appKey 'iv'

	static def encrypt value\any
		const cipher = crypto.createCipheriv(algorithm, self.key!, self.iv!)

		Buffer.concat([cipher.update(JSON.stringify(value)), cipher.final()]).toString('hex')

	static def decrypt hash\String
		try
			const decipher = crypto.createDecipheriv(algorithm, self.key!, self.iv!);

			const decrypted = Buffer.concat([decipher.update(Buffer.from(hash, 'hex')), decipher.final()]).toString!

			JSON.parse(decrypted)
		catch
			throw new DecryptException 'Invalid data.'
