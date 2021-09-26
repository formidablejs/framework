function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$configφ = requireDefault$__(require('../../Support/Helpers/config'/*$path$*/));
var _$fastify_cookieφ = requireDefault$__(require('fastify-cookie'/*$path$*/));
var _$Encrypterφ = requireDefault$__(require('../../Foundation/Encrypter'/*$path$*/));

function hasCookies(fastify,config){
	
	return fastify.register(_$fastify_cookieφ.default,{
		secret: _$Encrypterφ.default.key(),
		parseOptions: {
			domain: config.get('session.domain'),
			httpOnly: config.get('session.http_only'),
			maxAge: config.get('session.lifetime'),
			path: config.get('session.path'),
			sameSite: config.get('session.same_site'),
			secure: config.get('session.secure'),
			signed: config.get('session.encrypt')
		}
	});
};
exports.default = hasCookies;
