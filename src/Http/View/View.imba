import dot from '../../Support/Helpers/dotNotation'
import isEmpty from '../../Support/Helpers/isEmpty'
import isString from '../../Support/Helpers/isString'
import UndefinedDataPropException from './Exceptions/UndefinedDataPropException'

export default class View

	prop #data\Object = {}

	def constructor data\Object = {}
		self.#data\Object = data

	def get property\String, default\any = null
		const value = dot(self.#data, property)

		if (value == null || value == undefined) && (default == null || default == undefined)
			throw new UndefinedDataPropException 'Data prop is undefined.'

		value ?? default

	def has property\String
		dot(self.#data, property) != null && dot(self.#data, property) != undefined

	def beforeRender
		null

	def afterRender
		null

	def handle
		null

	def render
		null

	def make
		self.#setup!

		await self.handle!

		await self.beforeRender!

		const response = await self.render!

		await self.afterRender!

		String(response)
