import ConfigNotCachedError from './Error/ConfigNotCachedError'
import dot from './dotNotation'
import path from 'path'

def fallback notation\string, default\any = null
	try
		const app = require('../../Foundation/Application').default

		app.getConfig(notation, default)
	catch e
		throw new ConfigNotCachedError

export default def config notation\string, default\any = null
	try
		const config = require(path.join(process.cwd!, 'bootstrap', 'cache', 'config.json'))

		dot(config, notation) ?? default
	catch e
		fallback(notation, default)
