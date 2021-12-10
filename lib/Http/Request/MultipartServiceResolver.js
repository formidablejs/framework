function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};;
function iter$__(a){ let v; return a ? ((v=a.toIterable) ? v.call(a) : a) : []; };
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$fsφ = require('fs'/*$path$*/);
var _$fsφ2 = require('fs'/*$path$*/);
var _$Fileφ = requireDefault$__(require('./File'/*$path$*/));
var _$isEmptyφ = requireDefault$__(require('../../Support/Helpers/isEmpty'/*$path$*/));
var _$ServiceResolverφ = requireDefault$__(require('../../Support/ServiceResolver'/*$path$*/));
var _$Validatorφ = requireDefault$__(require('../../Validator/Validator'/*$path$*/));
var _$withoutφ = requireDefault$__(require('../../Support/Helpers/without'/*$path$*/));
class MultipartServiceResolver extends _$ServiceResolverφ.default {
	
	
	boot(){
		
		this.saveTempFiles();
		this.unlinkTempFiles();
		
		_$Validatorφ.default.get().register('file',this.handleFile,'Invalid file.');
		_$Validatorφ.default.get().register('mimes',this.handleMimes,'Invalid mime type.');
		_$Validatorφ.default.get().register('mimetypes',this.handleMimetypes,'Invalid mime type.');
		_$Validatorφ.default.get().register('image',this.handleImages,':attribute is not supported.');
		_$Validatorφ.default.get().register('video',this.handleVideos,':attribute is not supported.');
		return _$Validatorφ.default.get().register('file_size',this.handleSize,':attribute too large.');
	}
	
	saveTempFiles(){
		
		return this.app.addHook('preHandler',async function(/**@type {FastifyReply}*/request) {
			var resφ2, resφ;
			
			if (!(request.isMultipart())) {
				
				request.rawFiles = {};
				
				return;
			};
			
			const files = await request.saveRequestFiles();
			
			if (_$isEmptyφ.default(request.rawFiles)) { request.rawFiles = {} };
			
			resφ = [];
			for (let iφ = 0, itemsφ = iter$__(files), lenφ2 = itemsφ.length; iφ < lenφ2; iφ++) {
				let file = itemsφ[iφ];
				request.rawFiles[file.fieldname] = new _$Fileφ.default(_$withoutφ.default(file,['fields']));
				
				resφ2 = [];
				for (let iφ2 = 0, itemsφ2 = iter$__(Object.keys(file.fields)), lenφ = itemsφ2.length; iφ2 < lenφ; iφ2++) {
					let field = itemsφ2[iφ2];
					resφ2.push((_$isEmptyφ.default(file.fields[field].file) && !(_$isEmptyφ.default(file.fields[field].value))) && (
						
						
						_$isEmptyφ.default(request.body) && (
							request.body = {}
						),
						
						request.body[field] = file.fields[field].value
					));
				};
				resφ.push(resφ2);
			};
			return resφ;
		});
	}
	
	unlinkTempFiles(){
		
		return this.app.onResponse(function(response,/**@type {FormRequest}*/request) {
			
			if (_$isEmptyφ.default(request.request.rawFiles)) { return };
			
			for (let oφ = request.request.rawFiles, iφ3 = 0, keysφ = Object.keys(oφ), lφ = keysφ.length, file; iφ3 < lφ; iφ3++){
				file = keysφ[iφ3];
				const path = request.request.rawFiles[file].path;
				
				if (_$fsφ.existsSync(path)) {
					
					_$fsφ2.unlinkSync(path);
				};
			};
			
			return;
		});
	}
	
	/**
	@param {File} value
	*/
	handleFile(value){
		
		if (!((value instanceof _$Fileφ.default))) { return false };
		
		return true;
	}
	
	/**
	@param {File} value
	@param {String} mimes
	*/
	handleMimes(value,mimes){
		
		if (!((value instanceof _$Fileφ.default))) { return false };
		
		/**@type {String}*/ /**@type {String}*/(mimes) = _$isEmptyφ.default(mimes) ? '' : mimes;
		
		if (_$isEmptyφ.default(mimes)) { throw new TypeError('Expected an array of mimes.') };
		
		return mimes.split(',').includes(value.mime.split('/')[1]);
	}
	
	/**
	@param {File} value
	@param {String} mimes
	*/
	handleMimetypes(value,mimes){
		
		if (!((value instanceof _$Fileφ.default))) { return false };
		
		/**@type {String}*/ /**@type {String}*/(mimes) = _$isEmptyφ.default(mimes) ? '' : mimes;
		
		if (_$isEmptyφ.default(mimes)) { throw new TypeError('Expected an array of mimes.') };
		
		return mimes.split(',').includes(value.mime);
	}
	
	/**
	@param {File} value
	@param {String|null} mimes
	*/
	handleImages(value,mimes){
		
		if (!((value instanceof _$Fileφ.default))) { return false };
		
		/**@type {String}*/ /**@type {String}*/(mimes) = _$isEmptyφ.default(mimes) ? '' : mimes;
		
		return _$isEmptyφ.default(mimes) ? value.mime.startsWith('image/') : mimes.split(',').includes(value.mime.split('/')[1]);
	}
	
	/**
	@param {File} value
	*/
	handleVideos(value){
		
		if (!((value instanceof _$Fileφ.default))) { return false };
		
		return value.mime.startsWith('video/') || value.mime == 'application/x-mpegURL';
	}
	
	/**
	@param {File} value
	@param {Number} size
	*/
	handleSize(value,size){
		
		if (!((value instanceof _$Fileφ.default))) { return false };
		
		if (Number.isNaN(size)) { throw new TypeError('Expected a numeric value.') };
		
		size = (Number(size) * 1024) / 1048576;
		
		return value.size < size;
	}
};
exports.default = MultipartServiceResolver;
