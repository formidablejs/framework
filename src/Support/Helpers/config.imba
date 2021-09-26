import ConfigNotCachedError from './Error/ConfigNotCachedError'
import dot from './dotNotation'
import path from 'path'

export default def config notation\String, default\any = null
	try
		const config = require(path.join(process.cwd!, 'bootstrap', 'cache', 'config.json'))

		dot(config, notation) ?? default
	catch e
		throw new ConfigNotCachedError
