export default def imbaEnv stringify\boolean = true
	const prefix = 'IMBA_APP_'
	const envList = {}

	for own env, value of process.env
		if env.startsWith(prefix)
			envList[env] = value

	if stringify
		return JSON.stringify(envList)
	return envList
