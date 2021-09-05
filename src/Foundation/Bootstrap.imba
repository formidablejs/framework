const fs = require 'fs'
const path = require 'path'

module.exports = class Bootstrap

	static def cache location\String, config\Object
		location = path.join process.cwd!, location

		const directory = location.substring(0, location.lastIndexOf '/')

		if !fs.existsSync(directory) then fs.mkdirSync(directory, { recursive: true })

		if !fs.existsSync location
			fs.writeFileSync location, JSON.stringify(config), do(error)
				if error then console.warn error

		if fs.readFileSync(location, { encoding: 'utf8', flag: 'r' }) !== JSON.stringify(config)
			fs.writeFileSync location, JSON.stringify(config), do(error)
				if error then console.warn error
