import HtmlResponse from './HtmlResponse'

class HtmlTemplate
	html

	def constructor strings, ...keys
		html = do(...values)
			const dict = values[values.length - 1] || {}
			const results = [strings[0]]

			keys.forEach do(key, i)
				const value = Number.isInteger(key) ? values[key] : dict[key]
				results.push(value, strings[i + 1])

			results.join('')

def html template\ReadonlyArray<string>, ...keys
	new HtmlTemplate(template, keys)

def render template\HtmlTemplate, data\object = {}
	new HtmlResponse(template.html(data))

export {
	HtmlTemplate,
	html,
	render
}
