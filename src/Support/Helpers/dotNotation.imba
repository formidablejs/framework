import isObject from './isObject'
import isString from './isString'

export default def dotNotation object\object, key\string
	if !isObject object
		throw new TypeError 'Expected object'

	if !isString key
		throw new TypeError 'Expected string'

	let result = object
	for i in key.split('.')
		result = result ? result[i] ?? null : null
	result
