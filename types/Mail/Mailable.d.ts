import { Mailable as MailableBase } from '@formidablejs/mailer'
import { config as ConfigFinder } from '../Support/Helpers/index'

export class Mailable extends MailableBase {
  config: typeof ConfigFinder
}
