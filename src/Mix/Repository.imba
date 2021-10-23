import isEmpty from '../Support/Helpers/isEmpty'
import fs from 'fs'
import path from 'path'

export default class Repository

	static def get file\String
		const mixManifest\Object|null = self.manifest!

		if isEmpty mixManifest then return file

		mixManifest[file] || file

	static def manifest
		const location\String = path.join(process.cwd!, 'public', 'mix-manifest.json')

		if fs.existsSync(location)
			const content\String = fs.readFileSync(location, 'utf8')

			return content ? JSON.parse(content) : null

		null
