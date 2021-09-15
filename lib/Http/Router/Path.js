Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
class Path {
	
	
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
exports.default = Path;
