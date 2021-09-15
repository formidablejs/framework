# import Application from '../../Foundation/Application'
import ConfigNotCachedError from './Error/ConfigNotCachedError'
import ConfigRepository from '../../Config/Repository'
import dot from './dotNotation'
import path from 'path'

# def fallback notation\String, default\any = null
# 	try Application.getConfig(notation, default)
# 	catch
# 		throw new ConfigNotCachedError

export default def config notation\string, default\string = null
	const location = path.join process.cwd!, 'bootstrap', 'cache', 'config.json'

	try
		const config = require location

		dot(config, notation) ?? default
	catch e
		throw new ConfigNotCachedError
