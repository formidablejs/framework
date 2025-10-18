import ConfigNotCachedError from './Error/ConfigNotCachedError'
import dot from './dotNotation'
import path from 'path'

def fallback notation\string, default\any = null
	if !notation or typeof notation != 'string'
		throw new ConfigNotCachedError
	try
		const app = require('../../Foundation/Application').default
		app.getConfig(notation, default)
	catch e
		throw new ConfigNotCachedError

export default def config notation\string, default\any = null
	if !notation or typeof notation != 'string'
		return default
	try
		const config = require(path.join(process.cwd!, 'bootstrap', 'cache', 'config.json'))
		return dot(config, notation) ?? default
	catch e
		return fallback(notation, default)
