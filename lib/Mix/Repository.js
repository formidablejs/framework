function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('../Support/Helpers/isEmpty'/*$path$*/));
var $2 = requireDefault$__(require('fs'/*$path$*/));
var $3 = requireDefault$__(require('path'/*$path$*/));

class Repository {
	
	
	/**
	@param {string} file
	*/
	static get(file){
		
		const mixManifest = this.manifest();
		
		if ($1.default(mixManifest)) { return file };
		
		return mixManifest[file] || file;
	}
	
	static manifest(){
		
		const location = $3.default.join(process.cwd(),'public','mix-manifest.json');
		
		if ($2.default.existsSync(location)) {
			
			const content = $2.default.readFileSync(location,'utf8');
			
			return content ? JSON.parse(content) : null;
		};
		
		return null;
	}
};
exports.default = Repository;
