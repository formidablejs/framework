export default def asObject object\Object
	let output = new Object

	for own property, value of object
		output[property] = value

	output
