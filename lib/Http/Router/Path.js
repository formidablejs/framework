
module.exports = class Path {
	
	
	/**
	@param {String[]} prefix
	@param {String} pattern
	*/
	static clean(prefix,pattern){
		
		prefix = prefix.join('/').replace(/^\s*\/*\s*|\s*\/*\s*$/gm,'');
		
		
		pattern = pattern.replace(/^\s*\/*\s*|\s*\/*\s*$/gm,'');
		
		
		return '/' + ("" + prefix + "/" + pattern).replace(/^\s*\/*\s*|\s*\/*\s*$/gm,'');
	}
};
