
const ConfigRepository = require('../../Config/Repository'/*$path$*/);
const fs = require('fs'/*$path$*/);
const Language = require('./Language'/*$path$*/);
const path = require('path'/*$path$*/);
const ServiceResolver = require('../ServiceResolver'/*$path$*/);

module.exports = class LanguageServiceResolver extends ServiceResolver {
	
	
	boot(){
		var self = this;
		
		self.app.addHook('onRequest',function(request,reply,done) {
			
			const resourcesLang = path.join(process.cwd(),'resources','lang');
			
			const language = self.app.make(Language);
			const locale = self.app.make(ConfigRepository).get('app.locale');
			const fallback = self.app.make(ConfigRepository).get('app.fallback_locale');
			
			language.setLocale(locale).setFallbackLocale(fallback);
			
			
			if (fs.existsSync(resourcesLang)) { language.register(resourcesLang) };
			
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
