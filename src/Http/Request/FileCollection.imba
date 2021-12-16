import File from './File'
import isEmpty from '../../Support/Helpers/isEmpty'

export default class FileCollection

	prop _object\Array = []
	prop _conditions\Array = []

	/**
	 * Count the number of files in the collection.
	 *
	 * @returns {Number}
	 */
	get length
		self._object.length

	/**
	 * Count the number of files in the collection.
	 *
	 * @returns {Number}
	 */
	def count
		self.length

	/**
	 * Push File to collection.
	 *
	 * @returns {File|null}
	 */
	def push file\File
		self._object.push(file)

		self

	/**
	 * Get first File in the collection.
	 *
	 * @returns {File|null}
	 */
	def first
		if self.length > 0 then return self._object[0]

		null

	/**
	 * Get last File in the collection.
	 *
	 * @returns {File|null}
	 */
	def last
		if self.length > 0 then return self._object[self._object.length - 1]

		null

	/**
	 * Check if collection has files or not.
	 *
	 * @returns {Boolean}
	 */
	def hasFiles
		self.length > 0

	/**
	 * Performs the specified action for each File in an array.
	 *
	 * @param {Function} callback
	 * @param {any} _this
	 * @returns {void}
	 */
	def each callback\Function, _this\null
		if isEmpty(_this) then return self._object.forEach callback, _this

		self._object.forEach callback

	/**
	 * Calls a defined callback function on each File of an array, and returns an array that contains the results.
	 *
	 * @param {Function} callback
	 * @param {any} _this
	 * @returns {File[]}
	 */
	def map callback\Function, _this\null
		if isEmpty(_this) then return self._object.map callback, _this

		self._object.map callback

	/**
	 * Returns the files of an array that meet the condition specified in a callback function.
	 *
	 * @param {Function} callback
	 * @param {any} _this
	 * @returns {File[]}
	 */
	def filter callback\Function, _this\null
		if isEmpty(_this) then return self._object.filter callback, _this

		self._object.filter callback

	/**
	 * Filter files using the where condition.
	 *
	 * @param {String} key
	 * @param {any} value
	 * @returns {File[]}
	 */
	def where key\String, value
		self._conditions.push { [key]: value }

		self

	/**
	 * Get files.
	 *
	 * @returns {File[]}
	 */
	def all
		self._object

	/**
	 * Get filtered files.
	 *
	 * @returns {File[]}
	 */
	def get
		let filtered = self._object

		for condition\{ key: String, value: any } in self._conditions
			filtered = filtered.filter do(file) file[condition.key] == condition.value

		filtered
