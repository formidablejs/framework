import FormValidation from '../Http/Request/FormValidation'

export default class Validator

	static def make body\Object, rules\Object, messages\Object = {}
		const validation = this.get!

		new validation(body, rules, messages)

	static def get
		validation = (new FormValidation).getValidation!
