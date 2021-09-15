import dot from '../Support/Helpers/dotNotation'

const settings = {
	environment: null
}

export default class Repository

	prop temp = {}

	# All of the configuration items.
	get registered
		new Object

	def has key\String
		let tempCheck = dot(temp, key)

		if tempCheck !== undefined && tempCheck !== null then return true

		dot(this.registered, key) !== undefined && dot(this.registered, key) !== null

	def get key\String, default\any
		let tempValue = dot(temp, key)

		if tempValue !== undefined && tempValue !== null then tempValue

		const output = dot(this.registered, key)

		output ?? default

	def set key\String, value\any
		self.temp[key] = value

	def all
		this.registered

	static def setEnvironment
		settings.environment

	static def getEnvironment
		settings.environment
