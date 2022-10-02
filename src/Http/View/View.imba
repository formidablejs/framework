import { escape as htmlEscape } from 'html-escaper'
import dot from '../../Support/Helpers/dotNotation'
import isEmpty from '../../Support/Helpers/isEmpty'
import isObject from '../../Support/Helpers/isObject'
import isString from '../../Support/Helpers/isString'
import querystring from 'querystring'
import UndefinedDataPropException from './Exceptions/UndefinedDataPropException'
import Language from '../../Support/Language/Language'

export default class View

	prop #_data\object = {}
	prop #_language\Language

	def constructor data\object = {}
		if !isObject(data) then throw TypeError "Expected object."

		self.#_data\object = data

	get data
		self.#_data

	def setData data\object
		if !isObject(data) then throw TypeError "Expected object."

		self.#_data\object = Object.assign(self.#_data, data)

		self

	def setLanguage language\Language
		self.#_language = language

		self

	def translate key\string, default\any
		self.#_language.get(key, default)

	def t key\string, default\any
		self.translate key, default

	def __ key\string, default\any
		self.translate key, default

	def old key\string, default\any
		const results = dot(self.#_data, "_old.{key}") ?? (isEmpty(default) ? '' : default )

	def session key\string, default\any
		dot(self.#_data, "_flashed.{key}") ?? (isEmpty(default) ? '' : default )

	def hasSession key\string
		!isEmpty(dot(self.#_data, "_flashed.{key}"))

	def hasError key\string
		!isEmpty(dot(self.#_data, "_flashed._errors.{key}"))

	def error key\string
		dot(self.#_data, "_flashed._errors.{key}")

	def get property\string, default\any = null, escape\boolean = true
		if !isString(property) then throw TypeError "Expected string."

		const value = dot(self.#_data, property)

		if (value == null || value == undefined) && (default == null || default == undefined)
			throw new UndefinedDataPropException 'Data prop is undefined.'

		if value
			return (escape && isString(value)) ? htmlEscape(value) : value

		default

	def raw property\string, default\any = null
		self.get(property, default, false)

	def has property\string
		if !isString(property) then throw TypeError "Expected string."

		dot(self.#_data, property) != null && dot(self.#_data, property) != undefined

	def csrf
		"<input type='hidden' name='_token' value={get('csrf_token')}>"

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
