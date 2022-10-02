import fs from 'fs'
import path from 'path'

export default class Bootstrap

	static def cache location\string, config\object
		location = path.join process.cwd!, location

		const directory = path.join process.cwd!, location.substring(0, location.lastIndexOf '/')

		if !fs.existsSync(directory) then fs.mkdirSync(directory, { recursive: true })

		fs.writeFileSync location, JSON.stringify(config), do(error)
			if error then console.warn error
