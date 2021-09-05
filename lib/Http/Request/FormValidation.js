
const Validator = require('validatorjs'/*$path$*/);

const ar = require('validatorjs/src/lang/ar'/*$path$*/);
const az = require('validatorjs/src/lang/az'/*$path$*/);
const be = require('validatorjs/src/lang/be'/*$path$*/);
const bg = require('validatorjs/src/lang/bg'/*$path$*/);
const bs = require('validatorjs/src/lang/bs'/*$path$*/);
const ca = require('validatorjs/src/lang/ca'/*$path$*/);
const cs = require('validatorjs/src/lang/cs'/*$path$*/);
const cy = require('validatorjs/src/lang/cy'/*$path$*/);
const da = require('validatorjs/src/lang/da'/*$path$*/);
const de = require('validatorjs/src/lang/de'/*$path$*/);
const el = require('validatorjs/src/lang/el'/*$path$*/);
const en = require('validatorjs/src/lang/en'/*$path$*/);
const es = require('validatorjs/src/lang/es'/*$path$*/);
const et = require('validatorjs/src/lang/et'/*$path$*/);
const eu = require('validatorjs/src/lang/eu'/*$path$*/);
const fa = require('validatorjs/src/lang/fa'/*$path$*/);
const fi = require('validatorjs/src/lang/fi'/*$path$*/);
const fr = require('validatorjs/src/lang/fr'/*$path$*/);
const hr = require('validatorjs/src/lang/hr'/*$path$*/);
const hu = require('validatorjs/src/lang/hu'/*$path$*/);
const id = require('validatorjs/src/lang/id'/*$path$*/);
const it = require('validatorjs/src/lang/it'/*$path$*/);
const ja = require('validatorjs/src/lang/ja'/*$path$*/);
const ka = require('validatorjs/src/lang/ka'/*$path$*/);
const ko = require('validatorjs/src/lang/ko'/*$path$*/);
const lt = require('validatorjs/src/lang/lt'/*$path$*/);
const lv = require('validatorjs/src/lang/lv'/*$path$*/);
const mk = require('validatorjs/src/lang/mk'/*$path$*/);
const mn = require('validatorjs/src/lang/mn'/*$path$*/);
const ms = require('validatorjs/src/lang/ms'/*$path$*/);
const nb_NO = require('validatorjs/src/lang/nb_NO'/*$path$*/);
const nl = require('validatorjs/src/lang/nl'/*$path$*/);
const pl = require('validatorjs/src/lang/pl'/*$path$*/);
const pt_BR = require('validatorjs/src/lang/pt_BR'/*$path$*/);
const pt = require('validatorjs/src/lang/pt'/*$path$*/);
const ro = require('validatorjs/src/lang/ro'/*$path$*/);
const ru = require('validatorjs/src/lang/ru'/*$path$*/);
const se = require('validatorjs/src/lang/se'/*$path$*/);
const sl = require('validatorjs/src/lang/sl'/*$path$*/);
const sq = require('validatorjs/src/lang/sq'/*$path$*/);
const sr = require('validatorjs/src/lang/sr'/*$path$*/);
const sv = require('validatorjs/src/lang/sv'/*$path$*/);
const tr = require('validatorjs/src/lang/tr'/*$path$*/);
const ua = require('validatorjs/src/lang/ua'/*$path$*/);
const uk = require('validatorjs/src/lang/uk'/*$path$*/);
const vi = require('validatorjs/src/lang/vi'/*$path$*/);
const zh = require('validatorjs/src/lang/zh'/*$path$*/);
const zh_TW = require('validatorjs/src/lang/zh_TW'/*$path$*/);

const locales = {
	ar: ar,
	az: az,
	be: be,
	bg: bg,
	bs: bs,
	ca: ca,
	cs: cs,
	cy: cy,
	da: da,
	de: de,
	el: el,
	en: en,
	es: es,
	et: et,
	eu: eu,
	fa: fa,
	fi: fi,
	fr: fr,
	hr: hr,
	hu: hu,
	id: id,
	it: it,
	ja: ja,
	ka: ka,
	ko: ko,
	lt: lt,
	lv: lv,
	mk: mk,
	mn: mn,
	ms: ms,
	nb_NO: nb_NO,
	nl: nl,
	pl: pl,
	pt_BR: pt_BR,
	pt: pt,
	ro: ro,
	ru: ru,
	se: se,
	sl: sl,
	sq: sq,
	sr: sr,
	sv: sv,
	tr: tr,
	ua: ua,
	uk: uk,
	vi: vi,
	zh: zh,
	zh_TW: zh_TW
};

module.exports = class FormValidation {
	
	
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
		
		Validator.useLang(this.locale);
		
		Validator.setMessages(this.locale,locales[this.locale]);
		
		return Validator;
	}
};
