import querystring from 'querystring'
import jwt from 'jsonwebtoken'
import Encrypter from '../../Foundation/Encrypter'
import InvalidSignatureException from '../Exceptions/InvalidSignatureException'
import type FormRequest from '../Request/FormRequest'

export default class ValidateSignature

	prop config

	def constructor config
		this.config = config

	def handle request\FormRequest
		try
			const decodedSignature = await jwt.verify(request.signature! ?? '', Encrypter.key!)

			const uri = querystring.unescape(decodedSignature.uri)

			if request.urlWithoutSignature! !== uri
				throw new InvalidSignatureException 'Invalid signature.'

			return request

		throw new InvalidSignatureException 'Invalid signature.'

