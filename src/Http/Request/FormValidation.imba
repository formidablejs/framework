import Validator from 'validatorjs'

import ar from 'validatorjs/src/lang/ar'
import az from 'validatorjs/src/lang/az'
import be from 'validatorjs/src/lang/be'
import bg from 'validatorjs/src/lang/bg'
import bs from 'validatorjs/src/lang/bs'
import ca from 'validatorjs/src/lang/ca'
import cs from 'validatorjs/src/lang/cs'
import cy from 'validatorjs/src/lang/cy'
import da from 'validatorjs/src/lang/da'
import de from 'validatorjs/src/lang/de'
import el from 'validatorjs/src/lang/el'
import en from 'validatorjs/src/lang/en'
import es from 'validatorjs/src/lang/es'
import et from 'validatorjs/src/lang/et'
import eu from 'validatorjs/src/lang/eu'
import fa from 'validatorjs/src/lang/fa'
import fi from 'validatorjs/src/lang/fi'
import fr from 'validatorjs/src/lang/fr'
import hr from 'validatorjs/src/lang/hr'
import hu from 'validatorjs/src/lang/hu'
import id from 'validatorjs/src/lang/id'
import it from 'validatorjs/src/lang/it'
import ja from 'validatorjs/src/lang/ja'
import ka from 'validatorjs/src/lang/ka'
import ko from 'validatorjs/src/lang/ko'
import lt from 'validatorjs/src/lang/lt'
import lv from 'validatorjs/src/lang/lv'
import mk from 'validatorjs/src/lang/mk'
import mn from 'validatorjs/src/lang/mn'
import ms from 'validatorjs/src/lang/ms'
import nb_NO from 'validatorjs/src/lang/nb_NO'
import nl from 'validatorjs/src/lang/nl'
import pl from 'validatorjs/src/lang/pl'
import pt_BR from 'validatorjs/src/lang/pt_BR'
import pt from 'validatorjs/src/lang/pt'
import ro from 'validatorjs/src/lang/ro'
import ru from 'validatorjs/src/lang/ru'
import se from 'validatorjs/src/lang/se'
import sl from 'validatorjs/src/lang/sl'
import sq from 'validatorjs/src/lang/sq'
import sr from 'validatorjs/src/lang/sr'
import sv from 'validatorjs/src/lang/sv'
import tr from 'validatorjs/src/lang/tr'
import ua from 'validatorjs/src/lang/ua'
import uk from 'validatorjs/src/lang/uk'
import vi from 'validatorjs/src/lang/vi'
import zh from 'validatorjs/src/lang/zh'
import zh_TW from 'validatorjs/src/lang/zh_TW'

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

export default class FormValidation

	def constructor locale\String = 'en'
		if !locales[locale]
			console.warn "The '{locale}' locale is missing in validatorjs. Reverting back to the 'en' locale."

			locale = 'en'

		locale = locale

	def getValidation
		Validator.useLang(locale)

		Validator.setMessages(locale, locales[locale])

		Validator
