import { escape as htmlEscape } from 'html-escaper'
import dot from '../../Support/Helpers/dotNotation'
import isEmpty from '../../Support/Helpers/isEmpty'
import isObject from '../../Support/Helpers/isObject'
import isString from '../../Support/Helpers/isString'
import querystring from 'querystring'
import UndefinedDataPropException from './Exceptions/UndefinedDataPropException'

export default class View

	prop #_data\Object = {}

	def constructor data\Object = {}
		if !isObject(data) then throw TypeError "Expected object."

		self.#_data\Object = data

	def setData data\Object
		if !isObject(data) then throw TypeError "Expected object."

		self.#_data\Object = Object.assign(self.#_data, data)

		self

	def old key\String, default\any
		const results = dot(self.#_data, "_old.{key}") ?? (isEmpty(default) ? '' : default )

	def session key\String, default\any
		dot(self.#_data, "_flashed.{key}") ?? (isEmpty(default) ? '' : default )

	def hasSession key\String
		!isEmpty(dot(self.#_data, "_flashed.{key}"))

	def hasError key\String
		!isEmpty(dot(self.#_data, "_flashed._errors.{key}"))

	def error key\String
		dot(self.#_data, "_flashed._errors.{key}")

	def get property\String, default\any = null, escape\boolean = true
		if !isString(property) then throw TypeError "Expected string."

		const value = dot(self.#_data, property)

		if (value == null || value == undefined) && (default == null || default == undefined)
			throw new UndefinedDataPropException 'Data prop is undefined.'

		if value
			return (escape && isString(value)) ? htmlEscape(value) : value

		default

	def raw property\String, default\any = null
		self.get(property, default, false)

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
