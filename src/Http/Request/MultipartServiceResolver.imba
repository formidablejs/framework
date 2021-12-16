import { existsSync } from 'fs'
import { unlinkSync } from 'fs'
import File from './File'
import FileCollection from './FileCollection'
import isArray from '../../Support/Helpers/isArray'
import isEmpty from '../../Support/Helpers/isEmpty'
import ServiceResolver from '../../Support/ServiceResolver'
import Validator from '../../Validator/Validator'
import without from '../../Support/Helpers/without'
import type { FastifyReply } from 'fastify'
import type FormRequest from './FormRequest'

export default class MultipartServiceResolver < ServiceResolver

	def boot
		self.saveTempFiles!
		self.unlinkTempFiles!

		Validator.get!.register('file', self.handleFile, 'Invalid file.')
		Validator.get!.register('mimes', self.handleMimes, 'Invalid mime type.')
		Validator.get!.register('mimetypes', self.handleMimetypes, 'Invalid mime type.')
		Validator.get!.register('image', self.handleImages, ':attribute is not supported.')
		Validator.get!.register('video', self.handleVideos, ':attribute is not supported.')
		Validator.get!.register('file_size', self.handleSize, ':attribute too large.')

	def saveTempFiles
		self.app.addHook 'preHandler', do(request\FastifyReply)
			if !request.isMultipart!
				request.rawFiles = {}
				request._rawFiles = {}

				return

			const files\{}[] = await request.saveRequestFiles!

			if isEmpty(request.rawFiles) then request.rawFiles = {}
			if isEmpty(request._rawFiles) then request._rawFiles = {}

			for file in files
				const fileObject = new File(without(file, ['fields']))

				if !isEmpty(request.rawFiles[file.fieldname])
					request.rawFiles[file.fieldname] = request.rawFiles[file.fieldname].push(fileObject)
				else
					request.rawFiles[file.fieldname] = (new FileCollection).push(fileObject)

				request._rawFiles[file.fieldname] = fileObject

				for field in Object.keys(file.fields)
					if isEmpty(file.fields[field].file) && !isEmpty(file.fields[field].value)

						if isEmpty(request.body) then request.body = {}

						request.body[field] = file.fields[field].value

	def unlinkTempFiles
		self.app.onResponse do(response, request\FormRequest)
			if isEmpty(request.request.rawFiles) then return

			for own key, collection\FileCollection of request.request.rawFiles

				collection.each do(file\File)
					if existsSync(file.path) then unlinkSync(file.path)

			return

	def handleFile value\File
		if !(value instanceof File) then return false

		true

	def handleMimes value\File, mimes\String
		if !(value instanceof File) then return false

		mimes\String = isEmpty(mimes) ? '' : mimes

		if isEmpty(mimes) then throw new TypeError 'Expected an array of mimes.'

		mimes.split(',').includes(value.mime.split('/')[1])

	def handleMimetypes value\File, mimes\String
		if !(value instanceof File) then return false

		mimes\String = isEmpty(mimes) ? '' : mimes

		if isEmpty(mimes) then throw new TypeError 'Expected an array of mimes.'

		mimes.split(',').includes(value.mime)

	def handleImages value\File, mimes\String|null
		if !(value instanceof File) then return false

		mimes\String = isEmpty(mimes) ? '' : mimes

		isEmpty(mimes) ? value.mime.startsWith('image/') : mimes.split(',').includes(value.mime.split('/')[1])

	def handleVideos value\File
		if !(value instanceof File) then return false

		value.mime.startsWith('video/') || value.mime == 'application/x-mpegURL'

	def handleSize value\File, size\Number
		if !(value instanceof File) then return false

		if Number.isNaN(size) then throw new TypeError 'Expected a numeric value.'

		size = (Number(size) * 1024) / 1048576

		value.size < size
