import isArray from './isArray'
import isObject from './isObject'

export default def without object\object, exclude\string[]
	if !isObject(object) then throw new TypeError 'Expected object'

	if !isArray(exclude) then throw new TypeError 'Expected array'

	const output = {}

	Object.keys(object).forEach do(key)
		if !exclude.includes(key) then Object.assign(output, {
			[ key ] : object[key]
		})

	output
