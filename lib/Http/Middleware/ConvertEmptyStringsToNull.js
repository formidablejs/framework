
const TransformsRequest = require('./TransformsRequest'/*$path$*/);

module.exports = class ConvertEmptyStringsToNull extends TransformsRequest {
	
	
	transform(key,value){
		
		return (value !== '') ? value : null;
	}
};
