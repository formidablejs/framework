export default def asObject object\object
	let output = new Object

	for own property, value of object
		output[property] = value

	output
