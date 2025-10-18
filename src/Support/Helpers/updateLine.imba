import { existsSync } from 'fs'
import { readFileSync } from 'fs'
import { writeFileSync } from 'fs'

export def updateLine file\string, callback\function
	if !existsSync(file) then return false

	const contents = readFileSync(file, 'utf8')
	const lines = []
	const splitLines = contents.split('\n')
	for index in [0...splitLines.length]
		lines.push callback(splitLines[index], index)

	writeFileSync(file, lines.join('\n'), { encoding: 'utf8' })
	return true
