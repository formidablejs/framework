import isString from './isString'

export default def slug value\string, separator\string = '-'
	if !isString value
		throw new TypeError 'value must be a string'

	if !isString separator
		throw new TypeError 'separator must be a string'

	value
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase!
		.trim!
		.replace(/[^a-z0-9 ]/g, '')
		.replace(/\s+/g, separator)
