import Application from '../../Foundation/Application'
import ConfigNotCachedError from './Error/ConfigNotCachedError'
import dot from './dotNotation'
import env from './env'
import path from 'path'

def fallback notation\String, default\any = null
	try Application.getConfig(notation, default)
	catch e
		throw new ConfigNotCachedError

export default def config notation\String, default\any = null
	const location = path.join(env('PREFER_DISTRIBUTED_CACHE', false) ? (process.cwd!, 'dist', 'config.json') : (process.cwd!, 'bootstrap', 'cache', 'config.json'))

	try
		const config = require location

		dot(config, notation) ?? default
	catch e
		fallback notation, default
