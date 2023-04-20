import { Output } from '@formidablejs/console'
import detectPort from 'detect-port/lib/detect-port'
import inquirer from 'inquirer'

def noInteraction\boolean
	const args = process.argv.slice(2)

	args.includes('--no-interaction')

def verifyPort\number port\number
	const _p = await detectPort(port)

	if _p != port
		if noInteraction!
			Output.write("\n  <bg:red><fg:white> ERROR </fg:white></bg:red> Something is already running on port {port}\n")

			process.exit(1)

			return

		Output.write("\n  <bg:yellow><fg:red> WARN </fg:red></bg:yellow> Something is already running on port {port}\n")

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
	verifyPort
}
