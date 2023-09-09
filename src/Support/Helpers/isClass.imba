export default def isClass object, strict\boolean = false
	if strict
		if !(object && object.constructor === Function) || object.prototype === undefined
			return false

		if Function.prototype !== Object.getPrototypeOf(object)
			return true

		return Object.getOwnPropertyNames(object.prototype).length > 1
	else
		typeof object === 'function' && /^\s*class\s+/.test(object.toString!)
