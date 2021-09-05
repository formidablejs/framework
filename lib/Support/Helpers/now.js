
const Database = require('../../Database/Database'/*$path$*/);

module.exports = function now(){
	
	// new Date().toISOString().replace('Z','').replace('T', ' ')
	// 'CURRENT_TIMESTAMP'
	return Database.fn.now();
};
