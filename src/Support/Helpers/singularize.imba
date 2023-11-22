import pluralize from 'pluralize'
import isString from './isString'

export default def singularize value\string
	if !isString value
		throw new TypeError 'value must be a string'

	pluralize.singular(value)
