function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$isEmptyφ = requireDefault$__(require('../Support/Helpers/isEmpty'/*$path$*/));
var _$fsφ = requireDefault$__(require('fs'/*$path$*/));
var _$pathφ = requireDefault$__(require('path'/*$path$*/));

class Repository {
	
	
	/**
	@param {String} file
	*/
	static get(file){
		
		const mixManifest = this.manifest();
		
		if (_$isEmptyφ.default(mixManifest)) { return file };
		
		return mixManifest[file] || file;
	}
	
	static manifest(){
		
		const location = _$pathφ.default.join(process.cwd(),'public','mix-manifest.json');
		
		if (_$fsφ.default.existsSync(location)) {
			
			const content = _$fsφ.default.readFileSync(location,'utf8');
			
			return content ? JSON.parse(content) : null;
		};
		
		return null;
	}
};
exports.default = Repository;
