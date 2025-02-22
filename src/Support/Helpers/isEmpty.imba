import isObject from './isObject'
import isArray from './isArray'
import isBoolean from './isBoolean'
import isString from './isString'

export default def isEmpty value\any
	if value === null || value === undefined
		return true

	if isString(value) && value.trim! === ''
		return true

	if isBoolean(value) && value === false
		return true

	if (isString(value) || typeof value === 'number') && !isNaN(value) && Number(value) === 0
		return true

	if isArray(value) && value.length === 0
		return true

	if isObject(value) && Object.keys(value).length === 0
		return true

	return false
