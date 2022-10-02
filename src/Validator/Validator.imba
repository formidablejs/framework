import FormValidation from '../Http/Request/FormValidation'

export default class Validator

	static def make body\object, rules\object, messages\object = {}
		const validation = this.get!

		new validation(body, rules, messages)

	static def get
		validation = (new FormValidation).getValidation!
