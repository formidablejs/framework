import ExitHandlerException from '../../Foundation/Exceptions/ExitHandlerException'
import InvalidExitFunction from './Error/InvalidExitFunction'
import isFunction from './isFunction'

export default def die handler
	if !(handler.constructor.name === 'AsyncFunction' || isFunction(handler))
		throw new InvalidExitFunction 'Handler must be a valid function.'

	throw new ExitHandlerException handler
