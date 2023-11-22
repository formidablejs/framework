import isString from './isString'

export default def slug value\string, separator\string = '-', options\object = null
	if !isString value
		throw new TypeError 'value must be a string'

	if !isString separator
		throw new TypeError 'separator must be a string'

	if options && typeof options != 'object'
		throw new TypeError 'options must be an object'

	if !options
		return value
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.toLowerCase!
			.trim!
			.replace(/[^a-z0-9 ]/g, '')
			.replace(/\s+/g, separator)

	const lowerCase = options.lowerCase ?? true

	if lowerCase
		value = value.toLowerCase!

	value
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.trim!
		.replace(/\s+/g, separator)
		.replace(/[0-9 ]/g, '')
