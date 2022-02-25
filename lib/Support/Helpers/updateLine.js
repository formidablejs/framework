Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$fsφ = require('fs'/*$path$*/);
var _$fsφ2 = require('fs'/*$path$*/);
var _$fsφ3 = require('fs'/*$path$*/);

/**
@param {String} file
@param {Function} callback
*/
function updateLine(file,callback){
	
	if (!(_$fsφ.existsSync(file))) { return false };
	
	const contents = _$fsφ2.readFileSync(file,'utf8');
	const lines = [];
	
	contents.split('\n').map(function(line,index) { return lines.push(callback(line,index)); });
	
	_$fsφ3.writeFileSync(file,lines.join('\n'),{encoding: 'utf8'});
	
	return true;
};
exports.updateLine = updateLine;
