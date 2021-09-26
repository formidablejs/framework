import Application from '../../Foundation/Application'
import isEmpty from './isEmpty'
import isString from './isString'

export default def env key\String, default\any = null
	try Application.getEnv(key, default)
	catch
		if !isString(key) then throw new TypeError 'Expected string.'

		let output = process.env[key]

		if isString output
			const results = output.match(/\$\{(.*?)\}/g)

			if !isEmpty(results)
				results.forEach do(variable)
					output = output.replace(variable, process.env[variable.slice(2, -1)])

		if isEmpty(output) then return default

		['true', 'false'].includes(output.toLowerCase!) ? output = JSON.parse(output) : output
