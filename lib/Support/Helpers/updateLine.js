Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('fs'/*$path$*/);
var $2 = require('fs'/*$path$*/);
var $3 = require('fs'/*$path$*/);

/**
@param {String} file
@param {Function} callback
*/
function updateLine(file,callback){
	
	if (!($1.existsSync(file))) { return false };
	
	const contents = $2.readFileSync(file,'utf8');
	const lines = [];
	
	contents.split('\n').map(function(line,index) { return lines.push(callback(line,index)); });
	
	$3.writeFileSync(file,lines.join('\n'),{encoding: 'utf8'});
	
	return true;
};
exports.updateLine = updateLine;
