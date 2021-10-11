import UndefinedDataPropException from './Exceptions/UndefinedDataPropException'
import isString from '../../Support/Helpers/isString'
import isEmpty from '../../Support/Helpers/isEmpty'

export default class View

	prop #data\Object = {}

	def constructor data\Object = {}
		self.#data\Object = data

	def #setup
		for own key\String, value\any of self.#data
			if !isEmpty(value)
				this[key] = value

	def get property\String, default\any = null
		const value = self[property]

		if (value == null || value == undefined) && isEmpty(default)
			throw new UndefinedDataPropException 'Data prop is undefined.'

		value ?? default

	def has property\String
		self[property] != null && self[property] != undefined

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
