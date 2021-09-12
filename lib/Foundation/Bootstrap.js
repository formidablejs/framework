
const fs = require('fs'/*$path$*/);
const path = require('path'/*$path$*/);

module.exports = class Bootstrap {
	
	
	/**
	@param {String} location
	@param {Object} config
	*/
	static cache(location,config){
		
		location = path.join(process.cwd(),location);
		
		const directory = location.substring(0,location.lastIndexOf('/'));
		
		if (!(fs.existsSync(directory))) { fs.mkdirSync(directory,{recursive: true}) };
		
		return fs.writeFileSync(location,JSON.stringify(config),function(error) {
			
			if (error) { return console.warn(error) };
		});
	}
};
