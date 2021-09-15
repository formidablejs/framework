export default class Path

	static def clean prefix\String[], pattern\String
		prefix = prefix
			.join('/')
			.replace /^\s*\/*\s*|\s*\/*\s*$/gm, ''

		pattern = pattern
			.replace /^\s*\/*\s*|\s*\/*\s*$/gm, ''

		'/' + "{prefix}/{pattern}".replace /^\s*\/*\s*|\s*\/*\s*$/gm, ''
