export default def imbaEnv stringify\boolean = true
	const prefix = 'IMBA_APP_'
	const envList = {}

	for own env, value of process.env
		if env.startsWith(prefix)
			envList[env] = value

	stringify ? JSON.stringify(envList) : envList
