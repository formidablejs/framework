import { promises as fs } from 'fs'

def updateLine file\string, callback\function
	try
		await fs.access(file)
	catch
		return false

	const contents = await fs.readFile(file, 'utf8')
	const lines = []
	const splitLines = contents.split('\n')
	for index in [0...splitLines.length]
		lines.push callback(splitLines[index], index)

	await fs.writeFile(file, lines.join('\n'), { encoding: 'utf8' })
	return true
