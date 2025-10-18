import File from './File'
import isEmpty from '../../Support/Helpers/isEmpty'

export default class FileCollection

	prop _object\Array = []
	prop _conditions\Array = []

	/**
	 * Count the number of files in the collection.
	 *
	 * @returns {number}
	 */
	get length
		self._object.length

	/**
	 * Count the number of files in the collection.
	 *
	 * @returns {number}
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
	 * @param {function} callback
	 * @param {any} _this
	 * @returns {void}
	 */
	def each callback\function, _this\null
		if isEmpty(_this)
			for file in self._object
				callback file, _this
			return

		for file in self._object
			callback file

	/**
	 * Calls a defined callback function on each File of an array, and returns an array that contains the results.
	 *
	 * @param {function} callback
	 * @param {any} _this
	 * @returns {File[]}
	 */
	def map callback\function, _this\null
		let result = []
		if isEmpty(_this)
			for file in self._object
				result.push(callback(file, _this))
			return result
		for file in self._object
			result.push(callback(file))
		return result

	/**
	 * Returns the files of an array that meet the condition specified in a callback function.
	 *
	 * @param {function} callback
	 * @param {any} _this
	 * @returns {File[]}
	 */
	def filter callback\function, _this\null
		let result = []
		if isEmpty(_this)
			for file in self._object
				if callback(file, _this)
					result.push(file)
			return result
		for file in self._object
			if callback(file)
				result.push(file)
		return result

	/**
	 * Filter files using the where condition.
	 *
	 * @param {string} key
	 * @param {any} value
	 * @returns {File[]}
	 */
	def where key\string, value
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
		for condition\{ key: string, value: any } in self._conditions
			let temp = []
			for file in filtered
				if file[condition.key] == condition.value
					temp.push(file)
			filtered = temp
		return filtered
