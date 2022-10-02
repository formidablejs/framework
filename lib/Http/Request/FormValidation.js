function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const $__initor__$ = Symbol.for('#__initor__'), $__inited__$ = Symbol.for('#__inited__'), $__hooks__$ = Symbol.for('#__hooks__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('validatorjs'/*$path$*/));

var $2 = requireDefault$__(require('validatorjs/src/lang/ar'/*$path$*/));
var $3 = requireDefault$__(require('validatorjs/src/lang/az'/*$path$*/));
var $4 = requireDefault$__(require('validatorjs/src/lang/be'/*$path$*/));
var $5 = requireDefault$__(require('validatorjs/src/lang/bg'/*$path$*/));
var $6 = requireDefault$__(require('validatorjs/src/lang/bs'/*$path$*/));
var $7 = requireDefault$__(require('validatorjs/src/lang/ca'/*$path$*/));
var $8 = requireDefault$__(require('validatorjs/src/lang/cs'/*$path$*/));
var $9 = requireDefault$__(require('validatorjs/src/lang/cy'/*$path$*/));
var $10 = requireDefault$__(require('validatorjs/src/lang/da'/*$path$*/));
var $11 = requireDefault$__(require('validatorjs/src/lang/de'/*$path$*/));
var $12 = requireDefault$__(require('validatorjs/src/lang/el'/*$path$*/));
var $13 = requireDefault$__(require('validatorjs/src/lang/en'/*$path$*/));
var $14 = requireDefault$__(require('validatorjs/src/lang/es'/*$path$*/));
var $15 = requireDefault$__(require('validatorjs/src/lang/et'/*$path$*/));
var $16 = requireDefault$__(require('validatorjs/src/lang/eu'/*$path$*/));
var $17 = requireDefault$__(require('validatorjs/src/lang/fa'/*$path$*/));
var $18 = requireDefault$__(require('validatorjs/src/lang/fi'/*$path$*/));
var $19 = requireDefault$__(require('validatorjs/src/lang/fr'/*$path$*/));
var $20 = requireDefault$__(require('validatorjs/src/lang/hr'/*$path$*/));
var $21 = requireDefault$__(require('validatorjs/src/lang/hu'/*$path$*/));
var $22 = requireDefault$__(require('validatorjs/src/lang/id'/*$path$*/));
var $23 = requireDefault$__(require('validatorjs/src/lang/it'/*$path$*/));
var $24 = requireDefault$__(require('validatorjs/src/lang/ja'/*$path$*/));
var $25 = requireDefault$__(require('validatorjs/src/lang/ka'/*$path$*/));
var $26 = requireDefault$__(require('validatorjs/src/lang/ko'/*$path$*/));
var $27 = requireDefault$__(require('validatorjs/src/lang/lt'/*$path$*/));
var $28 = requireDefault$__(require('validatorjs/src/lang/lv'/*$path$*/));
var $29 = requireDefault$__(require('validatorjs/src/lang/mk'/*$path$*/));
var $30 = requireDefault$__(require('validatorjs/src/lang/mn'/*$path$*/));
var $31 = requireDefault$__(require('validatorjs/src/lang/ms'/*$path$*/));
var $32 = requireDefault$__(require('validatorjs/src/lang/nb_NO'/*$path$*/));
var $33 = requireDefault$__(require('validatorjs/src/lang/nl'/*$path$*/));
var $34 = requireDefault$__(require('validatorjs/src/lang/pl'/*$path$*/));
var $35 = requireDefault$__(require('validatorjs/src/lang/pt_BR'/*$path$*/));
var $36 = requireDefault$__(require('validatorjs/src/lang/pt'/*$path$*/));
var $37 = requireDefault$__(require('validatorjs/src/lang/ro'/*$path$*/));
var $38 = requireDefault$__(require('validatorjs/src/lang/ru'/*$path$*/));
var $39 = requireDefault$__(require('validatorjs/src/lang/se'/*$path$*/));
var $40 = requireDefault$__(require('validatorjs/src/lang/sl'/*$path$*/));
var $41 = requireDefault$__(require('validatorjs/src/lang/sq'/*$path$*/));
var $42 = requireDefault$__(require('validatorjs/src/lang/sr'/*$path$*/));
var $43 = requireDefault$__(require('validatorjs/src/lang/sv'/*$path$*/));
var $44 = requireDefault$__(require('validatorjs/src/lang/tr'/*$path$*/));
var $45 = requireDefault$__(require('validatorjs/src/lang/ua'/*$path$*/));
var $46 = requireDefault$__(require('validatorjs/src/lang/uk'/*$path$*/));
var $47 = requireDefault$__(require('validatorjs/src/lang/vi'/*$path$*/));
var $48 = requireDefault$__(require('validatorjs/src/lang/zh'/*$path$*/));
var $49 = requireDefault$__(require('validatorjs/src/lang/zh_TW'/*$path$*/));

const locales = {
	ar: $2.default,
	az: $3.default,
	be: $4.default,
	bg: $5.default,
	bs: $6.default,
	ca: $7.default,
	cs: $8.default,
	cy: $9.default,
	da: $10.default,
	de: $11.default,
	el: $12.default,
	en: $13.default,
	es: $14.default,
	et: $15.default,
	eu: $16.default,
	fa: $17.default,
	fi: $18.default,
	fr: $19.default,
	hr: $20.default,
	hu: $21.default,
	id: $22.default,
	it: $23.default,
	ja: $24.default,
	ka: $25.default,
	ko: $26.default,
	lt: $27.default,
	lv: $28.default,
	mk: $29.default,
	mn: $30.default,
	ms: $31.default,
	nb_NO: $32.default,
	nl: $33.default,
	pl: $34.default,
	pt_BR: $35.default,
	pt: $36.default,
	ro: $37.default,
	ru: $38.default,
	se: $39.default,
	sl: $40.default,
	sq: $41.default,
	sr: $42.default,
	sv: $43.default,
	tr: $44.default,
	ua: $45.default,
	uk: $46.default,
	vi: $47.default,
	zh: $48.default,
	zh_TW: $49.default
};

class FormValidation {
	
	
	/**
	@param {string} locale
	*/
	constructor(locale = 'en'){
		
		if (!locales[locale]) {
			
			console.warn(("The '" + locale + "' locale is missing in validatorjs. Reverting back to the 'en' locale."));
			
			locale = 'en';
		};
		
		this.locale = locale;
	}
	
	getValidation(){
		
		$1.default.useLang(this.locale);
		
		$1.default.setMessages(this.locale,locales[this.locale]);
		
		return $1.default;
	}
};
exports.default = FormValidation;
