import { Output } from '@formidablejs/console'
import detectPort from 'detect-port/lib/detect-port'
import inquirer from 'inquirer'

def altPort\number port\number
	const _p = await detectPort(port)

	if _p !== port
		Output.write("\n  <bg:yellow><fg:red> WARNING </fg:red></bg:yellow> Something is already running on port {port}.\n")

		const results = await inquirer.prompt([{
			name: 'run'
			message: 'Would you like to run the app on another port instead?'
			type: 'confirm'
		}])

		if !results.run
			process.exit(1)
		else
			return _p

	port

export {
	altPort
}
