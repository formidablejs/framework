export default class Path

	static def clean prefix\string[], pattern\string
		prefix = prefix
			.join('/')
			.replace /^\s*\/*\s*|\s*\/*\s*$/gm, ''

		pattern = pattern
			.replace /^\s*\/*\s*|\s*\/*\s*$/gm, ''

		'/' + "{prefix}/{pattern}".replace /^\s*\/*\s*|\s*\/*\s*$/gm, ''
