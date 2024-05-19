import * as helpers from './index'

export default def loadHelpers
	for own key, value of helpers
		if !global[key] && value
			global[key] = value

