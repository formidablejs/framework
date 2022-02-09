import hasAttr from '@formidablejs/framework/lib/Http/SPA/hasAttr'
import readProps from '@formidablejs/framework/lib/Http/SPA/readProps'

let props = { }

export tag Props
	def render
		<self>
			if hasAttr(self) then props = readProps(self)

		imba.commit!

export { props }
