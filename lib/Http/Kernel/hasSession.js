
const session = require('@fastify/session'/*$path$*/);
const SessionDriverManager = require('../Session/DriverManager'/*$path$*/);

module.exports = function hasSession(fastify,config){
	
	const sessionConfig = {
		secret: config.get('app.key'),
		store: null,
		cookieName: config.get('session.cookie'),
		cookie: {
			domain: config.get('session.domain'),
			httpOnly: config.get('session.http_only'),
			maxAge: config.get('session.lifetime'),
			path: config.get('session.path'),
			sameSite: config.get('session.same_site'),
			secure: config.get('session.secure'),
			signed: config.get('session.encrypt')
		}
	};
	
	const driver = config.get('session.driver','memory');
	
	const store = SessionDriverManager.get(driver);
	
	if (store !== null || store !== undefined) {
		
		sessionConfig.store = store;
	};
	
	return fastify.register(session,sessionConfig);
};
