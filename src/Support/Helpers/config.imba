import ConfigNotCachedError from './Error/ConfigNotCachedError'
import dot from './dotNotation'
import path from 'path'

export default def config notation\string, default\string = null
	const location = path.join process.cwd!, 'bootstrap', 'cache', 'config.json'

	try
		const config = require location

		dot(config, notation) ?? default
	catch e
		throw new ConfigNotCachedError
