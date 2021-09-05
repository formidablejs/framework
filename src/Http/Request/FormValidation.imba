const Validator = require 'validatorjs'

const ar = require 'validatorjs/src/lang/ar'
const az = require 'validatorjs/src/lang/az'
const be = require 'validatorjs/src/lang/be'
const bg = require 'validatorjs/src/lang/bg'
const bs = require 'validatorjs/src/lang/bs'
const ca = require 'validatorjs/src/lang/ca'
const cs = require 'validatorjs/src/lang/cs'
const cy = require 'validatorjs/src/lang/cy'
const da = require 'validatorjs/src/lang/da'
const de = require 'validatorjs/src/lang/de'
const el = require 'validatorjs/src/lang/el'
const en = require 'validatorjs/src/lang/en'
const es = require 'validatorjs/src/lang/es'
const et = require 'validatorjs/src/lang/et'
const eu = require 'validatorjs/src/lang/eu'
const fa = require 'validatorjs/src/lang/fa'
const fi = require 'validatorjs/src/lang/fi'
const fr = require 'validatorjs/src/lang/fr'
const hr = require 'validatorjs/src/lang/hr'
const hu = require 'validatorjs/src/lang/hu'
const id = require 'validatorjs/src/lang/id'
const it = require 'validatorjs/src/lang/it'
const ja = require 'validatorjs/src/lang/ja'
const ka = require 'validatorjs/src/lang/ka'
const ko = require 'validatorjs/src/lang/ko'
const lt = require 'validatorjs/src/lang/lt'
const lv = require 'validatorjs/src/lang/lv'
const mk = require 'validatorjs/src/lang/mk'
const mn = require 'validatorjs/src/lang/mn'
const ms = require 'validatorjs/src/lang/ms'
const nb_NO = require 'validatorjs/src/lang/nb_NO'
const nl = require 'validatorjs/src/lang/nl'
const pl = require 'validatorjs/src/lang/pl'
const pt_BR = require 'validatorjs/src/lang/pt_BR'
const pt = require 'validatorjs/src/lang/pt'
const ro = require 'validatorjs/src/lang/ro'
const ru = require 'validatorjs/src/lang/ru'
const se = require 'validatorjs/src/lang/se'
const sl = require 'validatorjs/src/lang/sl'
const sq = require 'validatorjs/src/lang/sq'
const sr = require 'validatorjs/src/lang/sr'
const sv = require 'validatorjs/src/lang/sv'
const tr = require 'validatorjs/src/lang/tr'
const ua = require 'validatorjs/src/lang/ua'
const uk = require 'validatorjs/src/lang/uk'
const vi = require 'validatorjs/src/lang/vi'
const zh = require 'validatorjs/src/lang/zh'
const zh_TW = require 'validatorjs/src/lang/zh_TW'

const locales = {
	ar
	az
	be
	bg
	bs
	ca
	cs
	cy
	da
	de
	el
	en
	es
	et
	eu
	fa
	fi
	fr
	hr
	hu
	id
	it
	ja
	ka
	ko
	lt
	lv
	mk
	mn
	ms
	nb_NO
	nl
	pl
	pt_BR
	pt
	ro
	ru
	se
	sl
	sq
	sr
	sv
	tr
	ua
	uk
	vi
	zh
	zh_TW
}

module.exports = class FormValidation

	def constructor locale\String = 'en'
		if !locales[locale]
			console.warn "The '{locale}' locale is missing in validatorjs. Reverting back to the 'en' locale."

			locale = 'en'

		locale = locale

	def getValidation
		Validator.useLang(locale)

		Validator.setMessages(locale, locales[locale])

		Validator
