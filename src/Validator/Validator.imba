const FormValidation = require '../Http/Request/FormValidation'

module.exports = class Validator

	static def make body\Object, rules\Object, messages\Object = {}
		const validation = this.get!

		new validation(body, rules, messages)

	static def get
		validation = (new FormValidation).getValidation!
