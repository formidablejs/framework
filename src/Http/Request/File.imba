import { existsSync } from 'fs'
import { moveSync } from 'fs'
import { statSync } from 'fs'
import DestinationExistsException from './Exceptions/DestinationExistsException'

export default class File

	prop _object = {}

	/**
	 * Instantiate file instance.
	 *
	 * @param {Object} file
	 * @returns {void}
	 */
	def constructor file\Object
		self._object = file

	/**
	 * File name.
	 *
	 * @type {String}
	 */
	get name
		self._object.filename

	/**
	 * File name.
	 *
	 * @type {String}
	 */
	get filename
		self.name

	/**
	 * File encoding.
	 *
	 * @type {String}
	 */
	get encoding
		self._object.encoding

	/**
	 * File mime type.
	 *
	 * @type {String}
	 */
	get mime
		self._object.mimetype

	/**
	 * File mime type.
	 *
	 * @type {String}
	 */
	get mimetype
		self._object.mimetype

	/**
	 * File mime type.
	 *
	 * @type {String}
	 */
	get type
		self._object.mimetype

	/**
	 * Temp file path.
	 *
	 * @type {String}
	 */
	get path
		self._object.filepath

	/**
	 * File extension.
	 *
	 * @type {String}
	 */
	get extension
		const i = self._object.filepath.lastIndexOf('.')

		i < 0 ? '' : self._object.filepath.substr(i)

	/**
	 * File extension.
	 *
	 * @type {String}
	 */
	get ext
		self.extension

	/**
	 * File size in MB.
	 *
	 * @type {Number}
	 */
	get size
		(self._object.file.bytesRead ?? 0) / 1048576

	/**
	 * Move file.
	 *
	 * @param {String} destination
	 * @param {Boolean} overwrite
	 * @throws {DestinationExistsException}
	 * @returns {void}
	 */
	def move destination\String, overwrite\Boolean = false
		if !overwrite && existsSync(destination) && statSync(destination).isFile!
			throw new DestinationExistsException 'Destination already exist.'

		moveSync self.path, destination, { overwrite }
