function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$Repositoryφ = requireDefault$__(require('../../Config/Repository'/*$path$*/));
var _$fsφ = requireDefault$__(require('fs'/*$path$*/));
var _$Languageφ = requireDefault$__(require('./Language'/*$path$*/));
var _$pathφ = requireDefault$__(require('path'/*$path$*/));
var _$ServiceResolverφ = requireDefault$__(require('../ServiceResolver'/*$path$*/));

class LanguageServiceResolver extends _$ServiceResolverφ.default {
	
	
	boot(){
		var self = this;
		
		self.app.addHook('onRequest',function(request,reply,done) {
			
			const resourcesLang = _$pathφ.default.join(process.cwd(),'resources','lang');
			
			const language = self.app.make(_$Languageφ.default);
			const locale = self.app.make(_$Repositoryφ.default).get('app.locale');
			const fallback = self.app.make(_$Repositoryφ.default).get('app.fallback_locale');
			
			language.setLocale(locale).setFallbackLocale(fallback);
			
			
			if (_$fsφ.default.existsSync(resourcesLang)) { language.register(resourcesLang) };
			
			request.language = language;
			
			return done();
		});
		
		return self.app.addHook('onResponse',function(request,reply,done) {
			
			request.language.unset();
			
			request.language = null;
			
			return done();
		});
	}
};
exports.default = LanguageServiceResolver;
