import { Command as BaseCommand } from '@formidablejs/console'
import type Application from '../Application'

export class Command < BaseCommand

	# @returns {Application}
	get app
		self.constructor.ctx
