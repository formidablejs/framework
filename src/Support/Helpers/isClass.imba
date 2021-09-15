export default def isClass object
	typeof object === 'function' && /^\s*class\s+/.test(object.toString!)
