function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('../../Config/Repository'/*$path$*/));
var $2 = requireDefault$__(require('fs'/*$path$*/));
var $3 = requireDefault$__(require('./Language'/*$path$*/));
var $4 = requireDefault$__(require('path'/*$path$*/));
var $5 = requireDefault$__(require('../ServiceResolver'/*$path$*/));

class LanguageServiceResolver extends $5.default {
	
	
	boot(){
		var self = this;
		
		self.app.addHook('onRequest',function(request,reply,done) {
			
			const resourcesLang = $4.default.join(process.cwd(),'resources','lang');
			
			const language = self.app.make($3.default);
			const locale = self.app.make($1.default).get('app.locale');
			const fallback = self.app.make($1.default).get('app.fallback_locale');
			
			language.setLocale(locale).setFallbackLocale(fallback);
			
			
			if ($2.default.existsSync(resourcesLang)) { language.register(resourcesLang) };
			
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
