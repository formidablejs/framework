function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$fsφ = requireDefault$__(require('fs'/*$path$*/));
var _$pathφ = requireDefault$__(require('path'/*$path$*/));

function version(){
	
	const packagePath = _$pathφ.default.join(process.cwd(),'package.json');
	
	if (!_$fsφ.default.existsSync) { return 'null' };
	
	const packageDetails = JSON.parse(_$fsφ.default.readFileSync(packagePath,'utf8'));
	
	return packageDetails.dependencies['@formidablejs/framework'] || 'null';
};
exports.default = version;
