import { Mail } from '@formidablejs/mailer'
import Database from '../Database/Database'
import isEmpty from '../Support/Helpers/isEmpty'
import isString from '../Support/Helpers/isString'

const registered = {
	Database: Database
	DB: Database
	Mail: Mail
}

class ContextAPI

	get registered
		registered

	def inject target
		if !(typeof target is 'function' && {}.toString.call(target) is '[object Function]')
			throw new TypeError 'Target must be a valid class.'

		if isEmpty target.context || (target.context && !isString(target.context))
			throw new TypeError "Missing context name."

		if registered[target.context]
			throw new Error "Target \"{target.context}\" already registered."

		registered[target.context] = target

		self

let Context = new ContextAPI

export {
	ContextAPI
	Context
}
