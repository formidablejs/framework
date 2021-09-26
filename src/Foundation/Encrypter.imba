import config from '../Support/Helpers/config'
import crypto from 'crypto'
import InvalidEncryptionKeyTypeException from './Exceptions/InvalidEncryptionKeyTypeException'
import isEmpty from '../Support/Helpers/isEmpty'

const algorithm = config('app.cipher', 'AES-256-CBC')

export default class Encrypter

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
