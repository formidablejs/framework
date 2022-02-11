export default def withEnv prefix = 'IMBA_'
	const envList = {}

	for env, value in process.env
		if env.startsWith(prefix))
			envList[env.slice(prefix.length)] = value

	envList
