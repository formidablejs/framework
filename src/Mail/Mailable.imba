import { Mailable as MailableBase } from '@formidablejs/mailer'
import { config as ConfigFinder } from '../Support/Helpers/index'

export class Mailable < MailableBase

	get config
		ConfigFinder
