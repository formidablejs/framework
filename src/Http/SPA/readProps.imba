export default def readProps component
	let props = { }

	for prop in component.attributes
		if prop.name !== 'class'
			try
				props[prop.name] = JSON.parse(prop.nodeValue)
			catch
				props[prop.name] = prop.nodeValue

	props
