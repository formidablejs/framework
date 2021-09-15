import session from '@fastify/session'
import DriverManager from './DriverManager'
import ServiceResolver from '../../Support/ServiceResolver'
import FileStore from 'session-file-store'

export default class SessionFileStoreServiceResolver < ServiceResolver

	def boot
		if self.app.config.get('session.driver') === 'file'
			const store = FileStore(session)

			DriverManager.register('file', new store({
				path: 'storage/sessions'
			}))
