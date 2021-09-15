import isString from '../../Support/Helpers/isString'
import jwt from 'jsonwebtoken'
import MissingRouteParamException from './Exceptions/MissingRouteParamException'
import Path from '../Router/Path'
import Route from '../Router/Manager'

const settings = {
	secret: null
}

export default class URL

	static def route name\String, params\Object = new Object, query\Object = new Object
		let selected;

		for route, key in Route.all!
			if route.name === name then selected = route

		if selected.path.trim! == '/'
			let uri = selected.path

			if Object.keys(query).length > 0
				uri = uri + '?' + self.toQuery(query)

			return uri

		uri = new String

		for path, key in selected.path.split('/')
			if path.startsWith(':') && !(params[path.split(':')[1]])
				throw new MissingRouteParamException "Missing param: {path.split(':')[1]}"

			uri = uri + (path.startsWith(':') ? params[path.split(':')[1]] : path) + '/'

		uri = Path.clean([], uri)

		if Object.keys(query).length > 0
			uri = uri + '?' + self.toQuery(query)

		uri

	static def signedRoute name\String, params\Object = new Object, query\Object = new Object
		const uri = self.route name, params, query

		const signature = await jwt.sign({ uri }, settings.secret, {})

		uri.includes('?') ? "{uri}&signature={signature}" : "{uri}?signature={signature}"

	static def temporarySignedRoute name\String, expiresIn\String, params\Object = new Object, query\Object = new Object
		let uri = self.route name, params, query

		const signature = await jwt.sign({ uri }, settings.secret, { expiresIn })

		uri.includes('?') ? "{uri}&signature={signature}" : "{uri}?signature={signature}"

	static def path uri\String, query\Object = new Object
		uri = Path.clean([], uri)

		if Object.keys(query).length > 0
			uri = uri + '?' + self.toQuery(query)

		uri

	static def signed uri\String, query\Object = new Object
		uri = self.path uri, query

		const signature = await jwt.sign({ uri }, settings.secret, {})

		uri.includes('?') ? "{uri}&signature={signature}" : "{uri}?signature={signature}"

	static def temporarySigned uri\String, expiresIn\String, query\Object = new Object
		luri = self.route uri, query

		const signature = await jwt.sign({ uri }, settings.secret, { expiresIn })

		uri.includes('?') ? "{uri}&signature={signature}" : "{uri}?signature={signature}"

	static def toQuery params\Object = new Object
		const query = []

		Object.keys(params).forEach do(key)
			query.push "{key}={params[key]}"

		query.join '&'

	static def setSecret secret\String
		if !isString(secret) then throw new TypeError 'secret must be a String'

		settings.secret = secret

		self
