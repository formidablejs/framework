import isObject from './isObject'
import isString from './isString'

export default def dotNotation object\Object, key\string
	if !isObject object
		throw new TypeError 'Expected object'

	if !isString key
		throw new TypeError 'Expected string'

	const results = key.split('.').reduce(&, object) do(o, i)
		o ? o[i] ?? null : null

	results
