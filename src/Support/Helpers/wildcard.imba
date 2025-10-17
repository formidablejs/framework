import isString from './isString'

export default def wildcard value\string, match\string
	if !isString value
		throw new TypeError 'value must be a string'

	if !isString match
		throw new TypeError 'match must be a string'

	const escapeRegex = do(value) value.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1")

	let parts = match.split("*")
	let regexStr = ""
	for idx in [0...parts.length]
		regexStr += escapeRegex(parts[idx])
		if idx < parts.length - 1
			regexStr += ".*"
	new RegExp("^" + regexStr + "$").test value
