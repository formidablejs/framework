function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};;
function iter$__(a){ let v; return a ? ((v=a.toIterable) ? v.call(a) : a) : a; };
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('fs'/*$path$*/);
var $2 = require('fs'/*$path$*/);
var $3 = requireDefault$__(require('./File'/*$path$*/));
var $4 = requireDefault$__(require('./FileCollection'/*$path$*/));
var $5 = requireDefault$__(require('../../Support/Helpers/isArray'/*$path$*/));
var $6 = requireDefault$__(require('../../Support/Helpers/isEmpty'/*$path$*/));
var $7 = requireDefault$__(require('../../Support/ServiceResolver'/*$path$*/));
var $8 = requireDefault$__(require('../../Validator/Validator'/*$path$*/));
var $9 = requireDefault$__(require('../../Support/Helpers/without'/*$path$*/));
class MultipartServiceResolver extends $7.default {
	
	
	boot(){
		
		this.saveTempFiles();
		this.unlinkTempFiles();
		
		$8.default.get().register('file',this.handleFile,'Invalid file.');
		$8.default.get().register('mimes',this.handleMimes,'Invalid mime type.');
		$8.default.get().register('mimetypes',this.handleMimetypes,'Invalid mime type.');
		$8.default.get().register('image',this.handleImages,':attribute is not supported.');
		$8.default.get().register('video',this.handleVideos,':attribute is not supported.');
		return $8.default.get().register('file_size',this.handleSize,':attribute too large.');
	}
	
	saveTempFiles(){
		
		return this.app.addHook('preHandler',async function(/**@type {FastifyReply}*/request) {
			var $13, $10;
			
			if (!(request.isMultipart())) {
				
				request.rawFiles = {};
				request._rawFiles = {};
				
				return;
			};
			
			const files = await request.saveRequestFiles();
			
			if ($6.default(request.rawFiles)) { request.rawFiles = {} };
			if ($6.default(request._rawFiles)) { request._rawFiles = {} };
			
			$10 = [];
			for (let $11 = 0, $12 = iter$__(files), $17 = $12.length; $11 < $17; $11++) {
				let file = $12[$11];
				const fileObject = new $3.default($9.default(file,['fields']));
				
				if (!($6.default(request.rawFiles[file.fieldname]))) {
					
					request.rawFiles[file.fieldname] = request.rawFiles[file.fieldname].push(fileObject);
				} else {
					
					request.rawFiles[file.fieldname] = (new $4.default).push(fileObject);
				};
				
				request._rawFiles[file.fieldname] = fileObject;
				
				$13 = [];
				for (let $14 = 0, $15 = iter$__(Object.keys(file.fields)), $16 = $15.length; $14 < $16; $14++) {
					let field = $15[$14];
					$13.push(($6.default(file.fields[field].file) && !($6.default(file.fields[field].value))) && (
						
						
						$6.default(request.body) && (
							request.body = {}
						),
						
						request.body[field] = file.fields[field].value
					));
				};
				$10.push($13);
			};
			return $10;
		});
	}
	
	unlinkTempFiles(){
		
		return this.app.onResponse(function(response,/**@type {FormRequest}*/request) {
			
			if ($6.default(request.request.rawFiles)) { return };
			
			for (let $20 = request.request.rawFiles, $18 = 0, $19 = Object.keys($20), $21 = $19.length, key, collection; $18 < $21; $18++){
				key = $19[$18];collection = $20[key];
				
				collection.each(function(/**@type {File}*/file) {
					
					if ($1.existsSync(file.path)) { return $2.unlinkSync(file.path) };
				});
			};
			
			return;
		});
	}
	
	/**
	@param {File} value
	*/
	handleFile(value){
		
		if (!((value instanceof $3.default))) { return false };
		
		return true;
	}
	
	/**
	@param {File} value
	@param {String} mimes
	*/
	handleMimes(value,mimes){
		
		if (!((value instanceof $3.default))) { return false };
		
		/**@type {String}*/ /**@type {String}*/(mimes) = $6.default(mimes) ? '' : mimes;
		
		if ($6.default(mimes)) { throw new TypeError('Expected an array of mimes.') };
		
		return mimes.split(',').includes(value.mime.split('/')[1]);
	}
	
	/**
	@param {File} value
	@param {String} mimes
	*/
	handleMimetypes(value,mimes){
		
		if (!((value instanceof $3.default))) { return false };
		
		/**@type {String}*/ /**@type {String}*/(mimes) = $6.default(mimes) ? '' : mimes;
		
		if ($6.default(mimes)) { throw new TypeError('Expected an array of mimes.') };
		
		return mimes.split(',').includes(value.mime);
	}
	
	/**
	@param {File} value
	@param {String|null} mimes
	*/
	handleImages(value,mimes){
		
		if (!((value instanceof $3.default))) { return false };
		
		/**@type {String}*/ /**@type {String}*/(mimes) = $6.default(mimes) ? '' : mimes;
		
		return $6.default(mimes) ? value.mime.startsWith('image/') : mimes.split(',').includes(value.mime.split('/')[1]);
	}
	
	/**
	@param {File} value
	*/
	handleVideos(value){
		
		if (!((value instanceof $3.default))) { return false };
		
		return value.mime.startsWith('video/') || value.mime == 'application/x-mpegURL';
	}
	
	/**
	@param {File} value
	@param {Number} size
	*/
	handleSize(value,size){
		
		if (!((value instanceof $3.default))) { return false };
		
		if (Number.isNaN(size)) { throw new TypeError('Expected a numeric value.') };
		
		size = (Number(size) * 1024) / 1048576;
		
		return value.size < size;
	}
};
exports.default = MultipartServiceResolver;
