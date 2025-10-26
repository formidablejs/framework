import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

export default class Repository

	static manifestCache\ViteManifest|null = null

	static def get file\string
		const manifest = self.getManifest!

		if !manifest
			return file

		const normalizedFile = file.startsWith('/') ? file.slice(1) : file

		if manifest[normalizedFile]
			return '/build/' + manifest[normalizedFile].file

		if normalizedFile == 'css/app.css'
			for [key, value] in Object.entries(manifest)
				if key.includes('css/app.css')
					return '/build/' + value.file

		if normalizedFile == 'js/app.js'
			for [key, value] in Object.entries(manifest)
				if key.includes('js/app.ts')
					return '/build/' + value.file

		file

	static def getManifest\ViteManifest|null
		if self.manifestCache != null
			return self.manifestCache

		const location = join(process.cwd!, 'public', 'build', '.vite', 'manifest.json')

		try
			if existsSync(location)
				const content = readFileSync(location, 'utf8')
				self.manifestCache = content ? JSON.parse(content) : null
			else
				self.manifestCache = null
		catch err
			self.manifestCache = null

		self.manifestCache
