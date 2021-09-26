import Encrypter from '../../Foundation/Encrypter'
import InvalidAppKeyException from './Exceptions/InvalidAppKeyException'
import isEmpty from '../Helpers/isEmpty'
import MissingAppKeyException from './Exceptions/MissingAppKeyException'
import type FormRequest from '../../Http/Request/FormRequest'
import type Repository from '../../Config/Repository'
import URL from '../../Http/URL/URL'

export default class HasEncryptionKey

	def constructor config\Repository
		config = config

	def handle request\FormRequest
		if !self.config.get
			throw new MissingAppKeyException 'No application encryption key has been specified.'

		if isEmpty(Encrypter.iv!)
			throw new InvalidAppKeyException 'Application key is not valid.'

		URL.setSecret(Encrypter.key!)

		request

	def key
		self.config.get 'app.key'
