export default def runtime
	const args = process.argv
	let runtime = 'node'

	if args && args.length > 0
		const executor = args[0].split('/').pop!

		runtime = executor if executor != undefined

	runtime
