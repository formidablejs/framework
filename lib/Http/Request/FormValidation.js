function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const Ψ__initor__ = Symbol.for('#__initor__'), Ψ__inited__ = Symbol.for('#__inited__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$validatorjsφ = requireDefault$__(require('validatorjs'/*$path$*/));

var _$arφ = requireDefault$__(require('validatorjs/src/lang/ar'/*$path$*/));
var _$azφ = requireDefault$__(require('validatorjs/src/lang/az'/*$path$*/));
var _$beφ = requireDefault$__(require('validatorjs/src/lang/be'/*$path$*/));
var _$bgφ = requireDefault$__(require('validatorjs/src/lang/bg'/*$path$*/));
var _$bsφ = requireDefault$__(require('validatorjs/src/lang/bs'/*$path$*/));
var _$caφ = requireDefault$__(require('validatorjs/src/lang/ca'/*$path$*/));
var _$csφ = requireDefault$__(require('validatorjs/src/lang/cs'/*$path$*/));
var _$cyφ = requireDefault$__(require('validatorjs/src/lang/cy'/*$path$*/));
var _$daφ = requireDefault$__(require('validatorjs/src/lang/da'/*$path$*/));
var _$deφ = requireDefault$__(require('validatorjs/src/lang/de'/*$path$*/));
var _$elφ = requireDefault$__(require('validatorjs/src/lang/el'/*$path$*/));
var _$enφ = requireDefault$__(require('validatorjs/src/lang/en'/*$path$*/));
var _$esφ = requireDefault$__(require('validatorjs/src/lang/es'/*$path$*/));
var _$etφ = requireDefault$__(require('validatorjs/src/lang/et'/*$path$*/));
var _$euφ = requireDefault$__(require('validatorjs/src/lang/eu'/*$path$*/));
var _$faφ = requireDefault$__(require('validatorjs/src/lang/fa'/*$path$*/));
var _$fiφ = requireDefault$__(require('validatorjs/src/lang/fi'/*$path$*/));
var _$frφ = requireDefault$__(require('validatorjs/src/lang/fr'/*$path$*/));
var _$hrφ = requireDefault$__(require('validatorjs/src/lang/hr'/*$path$*/));
var _$huφ = requireDefault$__(require('validatorjs/src/lang/hu'/*$path$*/));
var _$idφ = requireDefault$__(require('validatorjs/src/lang/id'/*$path$*/));
var _$itφ = requireDefault$__(require('validatorjs/src/lang/it'/*$path$*/));
var _$jaφ = requireDefault$__(require('validatorjs/src/lang/ja'/*$path$*/));
var _$kaφ = requireDefault$__(require('validatorjs/src/lang/ka'/*$path$*/));
var _$koφ = requireDefault$__(require('validatorjs/src/lang/ko'/*$path$*/));
var _$ltφ = requireDefault$__(require('validatorjs/src/lang/lt'/*$path$*/));
var _$lvφ = requireDefault$__(require('validatorjs/src/lang/lv'/*$path$*/));
var _$mkφ = requireDefault$__(require('validatorjs/src/lang/mk'/*$path$*/));
var _$mnφ = requireDefault$__(require('validatorjs/src/lang/mn'/*$path$*/));
var _$msφ = requireDefault$__(require('validatorjs/src/lang/ms'/*$path$*/));
var _$nb_NOφ = requireDefault$__(require('validatorjs/src/lang/nb_NO'/*$path$*/));
var _$nlφ = requireDefault$__(require('validatorjs/src/lang/nl'/*$path$*/));
var _$plφ = requireDefault$__(require('validatorjs/src/lang/pl'/*$path$*/));
var _$pt_BRφ = requireDefault$__(require('validatorjs/src/lang/pt_BR'/*$path$*/));
var _$ptφ = requireDefault$__(require('validatorjs/src/lang/pt'/*$path$*/));
var _$roφ = requireDefault$__(require('validatorjs/src/lang/ro'/*$path$*/));
var _$ruφ = requireDefault$__(require('validatorjs/src/lang/ru'/*$path$*/));
var _$seφ = requireDefault$__(require('validatorjs/src/lang/se'/*$path$*/));
var _$slφ = requireDefault$__(require('validatorjs/src/lang/sl'/*$path$*/));
var _$sqφ = requireDefault$__(require('validatorjs/src/lang/sq'/*$path$*/));
var _$srφ = requireDefault$__(require('validatorjs/src/lang/sr'/*$path$*/));
var _$svφ = requireDefault$__(require('validatorjs/src/lang/sv'/*$path$*/));
var _$trφ = requireDefault$__(require('validatorjs/src/lang/tr'/*$path$*/));
var _$uaφ = requireDefault$__(require('validatorjs/src/lang/ua'/*$path$*/));
var _$ukφ = requireDefault$__(require('validatorjs/src/lang/uk'/*$path$*/));
var _$viφ = requireDefault$__(require('validatorjs/src/lang/vi'/*$path$*/));
var _$zhφ = requireDefault$__(require('validatorjs/src/lang/zh'/*$path$*/));
var _$zh_TWφ = requireDefault$__(require('validatorjs/src/lang/zh_TW'/*$path$*/));

const locales = {
	ar: _$arφ.default,
	az: _$azφ.default,
	be: _$beφ.default,
	bg: _$bgφ.default,
	bs: _$bsφ.default,
	ca: _$caφ.default,
	cs: _$csφ.default,
	cy: _$cyφ.default,
	da: _$daφ.default,
	de: _$deφ.default,
	el: _$elφ.default,
	en: _$enφ.default,
	es: _$esφ.default,
	et: _$etφ.default,
	eu: _$euφ.default,
	fa: _$faφ.default,
	fi: _$fiφ.default,
	fr: _$frφ.default,
	hr: _$hrφ.default,
	hu: _$huφ.default,
	id: _$idφ.default,
	it: _$itφ.default,
	ja: _$jaφ.default,
	ka: _$kaφ.default,
	ko: _$koφ.default,
	lt: _$ltφ.default,
	lv: _$lvφ.default,
	mk: _$mkφ.default,
	mn: _$mnφ.default,
	ms: _$msφ.default,
	nb_NO: _$nb_NOφ.default,
	nl: _$nlφ.default,
	pl: _$plφ.default,
	pt_BR: _$pt_BRφ.default,
	pt: _$ptφ.default,
	ro: _$roφ.default,
	ru: _$ruφ.default,
	se: _$seφ.default,
	sl: _$slφ.default,
	sq: _$sqφ.default,
	sr: _$srφ.default,
	sv: _$svφ.default,
	tr: _$trφ.default,
	ua: _$uaφ.default,
	uk: _$ukφ.default,
	vi: _$viφ.default,
	zh: _$zhφ.default,
	zh_TW: _$zh_TWφ.default
};

class FormValidation {
	
	
	/**
	@param {String} locale
	*/
	constructor(locale = 'en'){
		
		if (!locales[locale]) {
			
			console.warn(("The '" + locale + "' locale is missing in validatorjs. Reverting back to the 'en' locale."));
			
			locale = 'en';
		};
		
		this.locale = locale;
	}
	
	getValidation(){
		
		_$validatorjsφ.default.useLang(this.locale);
		
		_$validatorjsφ.default.setMessages(this.locale,locales[this.locale]);
		
		return _$validatorjsφ.default;
	}
};
exports.default = FormValidation;
