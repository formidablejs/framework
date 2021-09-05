const ms = require 'ms'

module.exports = def expiresIn time\String
	"PX {ms(time)}"
