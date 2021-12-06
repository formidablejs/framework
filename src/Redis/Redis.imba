import RedisFactory from './RedisFactory'

export default class Redis < RedisFactory

	static def set key\String, value\String, options\any = null
		self.connection!.set key, value, options

	static def get key\String
		self.connection!.get key

	static def del key\String
		self.connection!.del key

	static def command command\String, key\String, value\String|null = null, nx\any = null
		self.connection!.sendCommand command, key, value, nx
