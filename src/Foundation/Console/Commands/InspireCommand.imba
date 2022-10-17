import { Command } from '../Command'
import { Inspiring } from '../../Inspiring'

export class InspireCommand < Command

	get signature
		'inspire'

	get description
		'Display an inspiring quote'

	def handle
		self.write(Inspiring.formatForConsole(Inspiring.quote))

		self.exit!
