function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('fs'/*$path$*/));
var $2 = requireDefault$__(require('path'/*$path$*/));

class Bootstrap {
	
	
	/**
	@param {String} location
	@param {Object} config
	*/
	static cache(location,config){
		
		location = $2.default.join(process.cwd(),location);
		
		const directory = location.substring(0,location.lastIndexOf('/'));
		
		if (!($1.default.existsSync(directory))) { $1.default.mkdirSync(directory,{recursive: true}) };
		
		return $1.default.writeFileSync(location,JSON.stringify(config),function(error) {
			
			if (error) { return console.warn(error) };
		});
	}
};
exports.default = Bootstrap;
