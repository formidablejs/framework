
const TransformsRequest = require('./TransformsRequest'/*$path$*/);

module.exports = class TrimStrings extends TransformsRequest {
	
	
	transform(key,value){
		
		return (typeof value == 'string') ? value.trim() : value;
	}
};
