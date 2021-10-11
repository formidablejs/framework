import fs from 'fs'
import path from 'path'

export default def version
	const packagePath = path.join(process.cwd!, 'package.json')

	if !fs.existsSync then return 'null'

	const packageDetails = JSON.parse(fs.readFileSync(packagePath, 'utf8'))

	packageDetails.dependencies['@formidablejs/framework'] || 'null'
