import querystring from 'querystring'
import isEmpty from '../../Support/Helpers/isEmpty'
import isString from '../../Support/Helpers/isString'
import isObject from '../../Support/Helpers/isObject'
import jwt from 'jsonwebtoken'
import MissingRouteParamException from './Exceptions/MissingRouteParamException'
import Path from '../Router/Path'
import Route from '../Router/Route'
import UnregisteredRouteException from './Exceptions/UnregisteredRouteException'

const settings = {
	secret: null
}

export default class URL

	static def setSecret secret\string
		if !isString(secret)
			throw new TypeError 'secret must be a String'

		settings.secret = secret

		self

	static def route name\string, params\object = {}
		const selected = Route.all!.find do(route) route.name === name

		if !isString(name)
			throw new TypeError 'name must be a String'

		if !isEmpty(params) && !isObject(params)
			throw new TypeError 'params must be an Object'

		if isEmpty selected
			throw new UnregisteredRouteException 'Route is not registered'

		selected.params = selected.path.match(/\:[a-zA-Z]+/gm) ?? []

		let query = {}
		const uri = []

		Object.keys(params).forEach(do(key)
			if !selected.params.includes(":{key}") && key !== '_query'
				query[key] = params[key]
		)

		selected.path.split('/').forEach(do(value)
			if value.startsWith(':')
				value = value.slice(1)

				if !Object.keys(params).includes(value)
					throw new MissingRouteParamException "Route '{name}' is missing '{value}' param."

				else value = params[value]

			uri.push value
		)

		query = (new URLSearchParams(Object.assign(query, (params._query ?? {})))).toString()

		uri.join('/') + (query.length > 0 ? "?{query}" : '')

	static def signedRoute name\string, params\object = {}
		const uri = self.route name, params

		const signature = await jwt.sign({ uri }, settings.secret, {})

		uri.includes('?') ? "{uri}&signature={signature}" : "{uri}?signature={signature}"

	static def temporarySignedRoute name\string, expiresIn\string, params\object = {}
		const uri = self.route name, params

		const signature = await jwt.sign({ uri }, settings.secret, { expiresIn })

		uri.includes('?') ? "{uri}&signature={signature}" : "{uri}?signature={signature}"

	static def signed uri\string, query\object = {}
		uri = self.path uri, query

		const signature = await jwt.sign({ uri }, settings.secret, {})

		uri.includes('?') ? "{uri}&signature={signature}" : "{uri}?signature={signature}"

	static def temporarySigned uri\string, expiresIn\string, query\object = new Object
		uri = self.path uri, query

		const signature = await jwt.sign({ uri }, settings.secret, { expiresIn })

		uri.includes('?') ? "{uri}&signature={signature}" : "{uri}?signature={signature}"

	static def path uri\string, query\object = {}
		if !isString(uri)
			throw new TypeError 'uri must be a String'

		if !isEmpty(query) && !isObject(query)
			throw new TypeError 'query must be an Object'

		uri = Path.clean([], uri)

		if Object.keys(query).length > 0
			uri = uri + '?' + querystring.stringify(query)

		uri
