import ConfigNotCachedError from './Error/ConfigNotCachedError'
import dot from './dotNotation'
import env from './env'
import path from 'path'

export default def config notation\string, default\string = null
	const location = path.join(env('PREFER_DISTRIBUTED_CACHE', false) ? (process.cwd!, 'dist', 'config.json') : (process.cwd!, 'bootstrap', 'cache', 'config.json'))

	try
		const config = require location

		dot(config, notation) ?? default
	catch e
		throw new ConfigNotCachedError
