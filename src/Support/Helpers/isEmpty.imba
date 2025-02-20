import isObject from './isObject'
import isArray from './isArray'
import isBoolean from './isBoolean'
import isString from './isString'
import isNumber from './isNumber'

export default def isEmpty value\any
	if value === null || value === undefined
		return true

	if isString(value) && value.trim! === ''
		return true

	if isBoolean(value) && value === false
		return true

	if isArray(value) && value.length === 0
		return true

	if isObject(value) && Object.keys(value).length === 0
		return true

	if isNumber(value) && Number(value) === 0
		return true

	return false
