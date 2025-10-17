import { promises as fs } from 'fs'

def updateLine file\string, callback\function
	if !existsSync(file) then return false

	const contents = fs.readFileSync(file, 'utf8')
	const lines = []
	const splitLines = contents.split('\n')
	for index in [0...splitLines.length]
		lines.push callback(splitLines[index], index)

	fs.writeFileSync(file, lines.join('\n'), { encoding: 'utf8' })
	return true
