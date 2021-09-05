
const HandleCors = require('../Middleware/HandleCors'/*$path$*/);
const ServiceResolver = require('../../Support/ServiceResolver'/*$path$*/);

module.exports = class CorsServiceResolver extends ServiceResolver {
	
	
	boot(){
		
		return HandleCors.configure(this.app.config.get('cors'));
	}
};
