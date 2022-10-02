import isEmpty from '../Support/Helpers/isEmpty'
import fs from 'fs'
import path from 'path'

export default class Repository

	static def get file\string
		const mixManifest\object|null = self.manifest!

		if isEmpty mixManifest then return file

		mixManifest[file] || file

	static def manifest
		const location\string = path.join(process.cwd!, 'public', 'mix-manifest.json')

		if fs.existsSync(location)
			const content\string = fs.readFileSync(location, 'utf8')

			return content ? JSON.parse(content) : null

		null
