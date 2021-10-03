import Encrypter from '../../Foundation/Encrypter'
import PersonalAccessToken from './PersonalAccessToken'
import ServiceResolver from '../../Support/ServiceResolver'

export default class PersonalAccessTokenServiceResolver < ServiceResolver

	def boot
		PersonalAccessToken
			.setConfig(self.app.config)
			.setEncrypter(Encrypter)
