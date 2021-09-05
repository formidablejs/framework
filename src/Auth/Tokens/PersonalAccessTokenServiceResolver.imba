const PersonalAccessToken = require './PersonalAccessToken'
const ServiceResolver = require '../../Support/ServiceResolver'

module.exports = class PersonalAccessTokenServiceResolver < ServiceResolver

	def boot
		PersonalAccessToken
			.setConfig(self.app.config)
			.setSecret(self.app.config.get('app.key'))
