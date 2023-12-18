export default def location
	const resource = new Promise(do(resolve, reject) resolve(1))

	try
		const kResourceStoreSymbol = Object.getOwnPropertySymbols(resource)[2]
		const kResourceStoreValue = resource[kResourceStoreSymbol]

		const locationSymbol = Object.getOwnPropertySymbols(kResourceStoreValue)[1]
		const locationValue = kResourceStoreValue[locationSymbol]

		if !locationValue.href
			return null

		locationValue
	catch error
		return null
