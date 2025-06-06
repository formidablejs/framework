export default def runtime
	if process == undefined
		return 'browser'

	const path = process.argv[0]
	let runtime = 'node'

	if path
		const isWindows = path.endsWith('.exe')
		const separator = isWindows ? '\\' : '/'
		let executor = path.split(separator).slice(-1)[0];

		if isWindows
			executor = executor.slice(0, -4);

		if executor
			runtime = executor

	runtime
