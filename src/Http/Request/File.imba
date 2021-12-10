import { existsSync } from 'fs-extra'
import { moveSync } from 'fs-extra'
import { statSync } from 'fs-extra'
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
	 * File size in MB.
	 *
	 * @type {Number}
	 */
	get size
		(self._object.file.bytesRead ?? 0) / 1048576

	/**
	 * Store file.
	 *
	 * @param {String} destination
	 * @param {Boolean} overwrite
	 * @throws {DestinationExistsException}
	 * @returns {void}
	 */
	def storeAs destination\String, overwrite\Boolean = false
		if !overwrite && existsSync(destination) && statSync(destination).isFile!
			throw new DestinationExistsException 'Destination already exist.'

		moveSync self.path, destination, { overwrite }
