function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$sessionφ = requireDefault$__(require('@fastify/session'/*$path$*/));
var _$DriverManagerφ = requireDefault$__(require('../Session/DriverManager'/*$path$*/));

function hasSession(fastify,config){
	
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
	
	const store = _$DriverManagerφ.default.get(driver);
	
	if (store !== null || store !== undefined) {
		
		sessionConfig.store = store;
	};
	
	return fastify.register(_$sessionφ.default,sessionConfig);
};
exports.default = hasSession;
