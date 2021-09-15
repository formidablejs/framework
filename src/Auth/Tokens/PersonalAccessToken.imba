import ConfigRepository from '../../Config/Repository'
import Database from '../../Database/Database'
import DatabaseConfig from '../../Database/Config'
import isArray from '../../Support/Helpers/isArray'
import isClass from '../../Support/Helpers/isClass'
import isNumber from '../../Support/Helpers/isNumber'
import isString from '../../Support/Helpers/isString'
import jwt from 'jsonwebtoken'

const settings = {
	config: null
	database: null
	secret: null
}

export default class PersonalAccessToken

	static def create name\String, id\Number, table\String, abilities\Array = ['*']
		if !isString(name) then throw new TypeError 'name must be a string.'

		if !isNumber(id) then throw new TypeError 'id must be an int.'

		if !isString(table) then throw new TypeError 'table must be a string.'

		if !isArray(abilities) then throw new TypeError 'abilities must be an array.'

		let returning = null

		try returning = DatabaseConfig.client == 'pg' ? ['id'] : null

		return self.getDatabase!.table('personal_access_tokens')
			.insert({
				tokenable_type: table
				tokenable_id: id
				name: name
				abilities: JSON.stringify(abilities)
			}, returning)
			.then do([ token ])
				token = (typeof token === 'object' && token.hasOwnProperty('id')) ? token.id : token

				await jwt.sign({ id: token }, settings.secret, {
					issuer: settings.config.get('app.url')
				})

	static def find token\String
		if !isString(token) then throw new TypeError 'token must be a string.'

		const response = {
			token: null
			tokenable: null
		}

		const decodedToken = await self.verify(token)

		if !decodedToken then return response

		token = await self.getDatabase!.table('personal_access_tokens')
			.where(id: decodedToken.id)
			.first!

		if token === undefined then return response

		const tokenable = await self.getDatabase!.table(token.tokenable_type)
			.where(id: token.tokenable_id)
			.first!

		return {
			token: token !== undefined ? token : null,
			tokenable: tokenable !== undefined ? tokenable : null
		}

	static def destroy token\String
		const decodedToken = await self.verify(token)

		await self.getDatabase!.table('personal_access_tokens')
			.where(id: decodedToken.id)
			.del!

	static def verify token\String
		if !isString(token) then throw new TypeError 'token must be a string.'

		try return await jwt.verify(token, settings.secret)

		false

	static def getDatabase
		settings.database ? settings.database : Database

	static def setDatabase database\Database
		if !isClass(database) then throw new TypeError 'database must be a valid class.'

		settings.database = database

		self

	static def setConfig config\Object
		if !(config instanceof ConfigRepository)
			throw new TypeError 'config must be an instance of ConfigRepository.'

		settings.config = config

		self

	static def setSecret secret\String
		if !isString(secret) then throw new TypeError 'secret must be a string.'

		settings.secret = secret

		self
