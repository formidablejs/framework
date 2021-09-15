function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$fsφ = requireDefault$__(require('fs'/*$path$*/));
var _$pathφ = requireDefault$__(require('path'/*$path$*/));

class Bootstrap {
	
	
	/**
	@param {String} location
	@param {Object} config
	*/
	static cache(location,config){
		
		location = _$pathφ.default.join(process.cwd(),location);
		
		const directory = location.substring(0,location.lastIndexOf('/'));
		
		if (!(_$fsφ.default.existsSync(directory))) { _$fsφ.default.mkdirSync(directory,{recursive: true}) };
		
		return _$fsφ.default.writeFileSync(location,JSON.stringify(config),function(error) {
			
			if (error) { return console.warn(error) };
		});
	}
};
exports.default = Bootstrap;
