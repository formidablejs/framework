import isArray from './isArray'
import isObject from './isObject'

export default def without object\object, exclude\string[]
	if !isObject(object) then throw new TypeError 'Expected object'

	if !isArray(exclude) then throw new TypeError 'Expected array'

	const output = {}

	keys = Object.keys(object)
	for key in keys
		if !exclude.includes(key)
			output[key] = object[key]

	output
