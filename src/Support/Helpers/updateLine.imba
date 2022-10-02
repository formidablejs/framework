import { existsSync } from 'fs'
import { readFileSync } from 'fs'
import { writeFileSync } from 'fs'

export def updateLine file\string, callback\function
	if !existsSync(file) then return false

	const contents = readFileSync(file, 'utf8')
	const lines = []

	contents.split('\n').map do(line, index) lines.push callback(line, index)

	writeFileSync file, lines.join('\n'), { encoding: 'utf8' }

	true
