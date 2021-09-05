
const ms = require('ms'/*$path$*/);

module.exports = /**
@param {String} time
*/
function expiresIn(time){
	
	return ("PX " + ms(time));
};
