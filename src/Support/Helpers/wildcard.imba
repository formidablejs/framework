import isString from './isString'

export default def wildcard value\string, match\string
	if !isString value
		throw new TypeError 'value must be a string'

	if !isString match
		throw new TypeError 'match must be a string'

	const escapeRegex = do(value) value.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1")

	new RegExp("^" + match.split("*").map(escapeRegex).join(".*") + "$").test value
