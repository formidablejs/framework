import { HigherOrderTapProxy } from '../HigherOrderTapProxy'
import { isEmpty } from './'
import { isFunction } from './'

export def tap object, callback
	if !isEmpty(callback)
		if !isFunction(callback) then throw TypeError 'Expected a valid function.'

		callback(object)

		return object

	new HigherOrderTapProxy object
