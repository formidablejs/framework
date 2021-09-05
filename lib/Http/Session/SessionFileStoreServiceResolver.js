
const session = require('@fastify/session'/*$path$*/);
const DriverManager = require('./DriverManager'/*$path$*/);
const ServiceResolver = require('../../Support/ServiceResolver'/*$path$*/);

module.exports = class SessionFileStoreServiceResolver extends ServiceResolver {
	
	
	boot(){
		
		if (this.app.config.get('session.driver') === 'file') {
			
			const FileStore = require('session-file-store'/*$path$*/)(session);
			
			return DriverManager.register('file',new FileStore({
				path: 'storage/sessions'
			}));
		};
	}
};
