import dot from '../../Support/Helpers/dotNotation'
import isObject from '../../Support/Helpers/isObject'
import isString from '../../Support/Helpers/isString'
import UndefinedDataPropException from './Exceptions/UndefinedDataPropException'

export default class View

	prop #_data\Object = {}

	def constructor data\Object = {}
		if !isObject(data) then throw TypeError "Expected object."

		self.#_data\Object = data

	def get property\String, default\any = null
		if !isString(property) then throw TypeError "Expected string."

		const value = dot(self.#_data, property)

		if (value == null || value == undefined) && (default == null || default == undefined)
			throw new UndefinedDataPropException 'Data prop is undefined.'

		value ?? default

	def has property\String
		if !isString(property) then throw TypeError "Expected string."

		dot(self.#_data, property) != null && dot(self.#_data, property) != undefined

	def beforeRender
		null

	def afterRender
		null

	def handle
		null

	def render
		null

	def make
		await self.handle!

		await self.beforeRender!

		const response = await self.render!

		await self.afterRender!

		String(response)
