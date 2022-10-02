import { existsSync } from 'fs-extra'
import { moveSync } from 'fs-extra'
import { statSync } from 'fs-extra'
import DestinationExistsException from './Exceptions/DestinationExistsException'

export default class File

	prop _object = {}

	/**
	 * Instantiate file instance.
	 *
	 * @param {object} file
	 * @returns {void}
	 */
	def constructor file\object
		self._object = file

	/**
	 * File name.
	 *
	 * @type {string}
	 */
	get name
		self._object.filename

	/**
	 * File name.
	 *
	 * @type {string}
	 */
	get filename
		self.name

	/**
	 * File encoding.
	 *
	 * @type {string}
	 */
	get encoding
		self._object.encoding

	/**
	 * File mime type.
	 *
	 * @type {string}
	 */
	get mime
		self._object.mimetype

	/**
	 * File mime type.
	 *
	 * @type {string}
	 */
	get mimetype
		self._object.mimetype

	/**
	 * File mime type.
	 *
	 * @type {string}
	 */
	get type
		self._object.mimetype

	/**
	 * Temp file path.
	 *
	 * @type {string}
	 */
	get path
		self._object.filepath

	/**
	 * File extension.
	 *
	 * @type {string}
	 */
	get extension
		const i = self._object.filepath.lastIndexOf('.')

		i < 0 ? '' : self._object.filepath.substr(i)

	/**
	 * File extension.
	 *
	 * @type {string}
	 */
	get ext
		self.extension

	/**
	 * File size in MB.
	 *
	 * @type {number}
	 */
	get size
		(self._object.file.bytesRead ?? 0) / 1048576

	/**
	 * Move file.
	 *
	 * @param {string} destination
	 * @param {Boolean} overwrite
	 * @throws {DestinationExistsException}
	 * @returns {void}
	 */
	def move destination\string, overwrite\boolean = false
		if !overwrite && existsSync(destination) && statSync(destination).isFile!
			throw new DestinationExistsException 'Destination already exist.'

		moveSync self.path, destination, { overwrite }
