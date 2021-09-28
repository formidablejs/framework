import AuthorizationException from '../../Auth/Exceptions/AuthorizationException'
import dot from '../../Support/Helpers/dotNotation'
import querystring from 'querystring'
import type { FastifyReply, FastifyRequest } from 'fastify'
import type Repository from '../../Config/Repository'
import Validator from '../../Validator/Validator'
import wildcard from '../../Support/Helpers/wildcard'

const response = { raw: null }
const options = { rules: null }

export default class FormRequest

	prop request\FastifyRequest
	prop reply\FastifyReply
	prop route = {}
	prop config\Repository

	def constructor request\FastifyRequest, route, reply, config\Repository
		self.request = request
		self.reply = reply
		self.route = route
		self.config = config

	def passesAuthorization
		if typeof this.authorize === 'function' then return this.authorize!

		false

	def failedAuthorization
		throw new AuthorizationException 'This action is unauthorized.'

	def rules
		{
			#
		}

	def messages
		{
			#
		}

	def locale
		self.request.language.locale

	def defaultLocale
		self.request.language.fallbackLocale

	def setLocale locale\String
		self.request.language.setLocale(locale)

	def setFallbackLocale locale\String
		self.request.language.setFallbackLocale(locale)

	def translate path\String, default\String
		self.request.language.get(path, default)

	def t path\String, default\String
		self.translate(path, default)

	def __ path\String, default\String
		self.translate(path, default)

	def signature
		let urlSignature = self.query('signature', null)

		if urlSignature == null || urlSignature == undefined || urlSignature == ''
			urlSignature = self.param('signature') ?? null

		urlSignature

	def url
		this.request.url

	def urlWithoutQuery
		self.url!.includes('?') ? self.url!.split('?')[0] : self.url!

	def urlWithoutSignature
		self.signature! ? querystring.unescape(self.url!.split('signature')[0].slice(0, -1)) : self.url!

	def fullUrl
		this.header('host') + this.url!

	def method
		this.request.method

	def isUrl path
		this.url! === '/' + (path.replace /^\s*\/*\s*|\s*\/*\s*$/gm, '')

	def isFullUrl path
		this.fullUrl! === path.replace /^\s*\/*\s*|\s*\/*\s*$/gm, ''

	def isMethod method\string
		this.method! == method

	def headers
		this.request.headers

	def hasHeader header\string
		this.headers![header] ? true : false

	def setHeader header\string, value\string
		self.reply.header(header, value)

		this

	def setHeaders headers\object
		const req = this

		Object.keys(headers).forEach do(value)
			req.setHeader(value, headers[value])

		this

	def header header\string, default = null
		this.headers![header] ?? default

	def bearerToken
		const token = self.header('authorization', new String)

		if token.startsWith('Bearer ') then return token.split(' ')[1]

		new String

	def getHost
		this.header 'host'

	def getFullOrigin
		this.header 'origin'

	def getOrigin
		try
			return this.getFullOrigin!.split('://')[1]

		return ''

	def getOriginProtocol
		try
			return this.getFullOrigin!.split('://')[0] + '://'

		return ''

	def ip
		this.request.ip

	def pathIs path\string
		wildcard(this.route.path, path)

	def routeIs route\string
		wildcard(this.route.name ?? '', route)

	def param name\String
		self.request.params[name]

	def params
		self.request.params

	def body
		self.request.body !== null ? self.request.body : {}

	def all
		Object.assign(this.query!, self.body!)

	def input key\string|null = null, default = null
		if !key && !default then return self.body!

		dot(self.body!, key) ?? default

	def has key\string
		this.all![key] ? true : false

	def get key\string, default = null
		this.all![key] ?? default

	def only keys\string[]
		if (!Array.isArray(keys))
			return []

		let response = {}

		keys.forEach do(key)
			const value = this.all![key]

			if value
				Object.assign response, {
					[key]: value
				}

		response

	def query key\string|null = null, default = null
		if (!key && !default)
			return this.request.query

		let value = this.request.query[key]

		value = value ? querystring.unescape(value) : value

		value ?? default

	def expectsJson
		wildcard(this.header('accept', ''), '*json')

	def validate
		Validator.make(this.input!, this.getRules!, this.messages!)

	def setRules rules\Array
		if options.rules !== null
			throw new Error('FormRequest rules have already been set.')

		options.rules = rules

	def getRules
		options.rules === null ? this.rules! : options.rules

	def auth
		{
			user: do null
			check: do false
			can: do(perform\String) false
		}
