import hasAttr from '@formidablejs/framework/lib/Http/Spa/hasAttr'
import readProps from '@formidablejs/framework/lib/Http/Spa/readProps'

let props = { }

export tag Props
	def render
		<self>
			if hasAttr(self) then props = readProps(self)

		imba.commit!

export { props }
