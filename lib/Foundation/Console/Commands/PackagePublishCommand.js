Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$Commandφ = require('../Command'/*$path$*/);
var _$fs_extraφ = require('fs-extra'/*$path$*/);
var _$fs_extraφ2 = require('fs-extra'/*$path$*/);
var _$Helpersφ = require('../../../Support/Helpers'/*$path$*/);
var _$pathφ = require('path'/*$path$*/);
var _$consoleφ = require('@formidablejs/console'/*$path$*/);
var _$fs_extraφ3 = require('fs-extra'/*$path$*/);

class PackagePublishCommand extends _$Commandφ.Command {
	
	
	get signature(){
		
		return 'package:publish {--package} {--tag} {?--force}';
	}
	
	get description(){
		
		return 'Install Formidable package';
	}
	
	get props(){
		
		return {
			package: _$consoleφ.Prop.string().description('Package name'),
			tag: _$consoleφ.Prop.string().multiple().description('Assets you want to publish'),
			force: _$consoleφ.Prop.boolean().default(false).description('Overwrite any existing files')
		};
	}
	
	get package(){
		
		return _$pathφ.join(process.cwd(),'node_modules',this.option('package'));
	}
	
	get definition(){
		
		const npmFile = _$pathφ.join(this.package,'package.json');
		
		if (!(_$fs_extraφ2.existsSync(npmFile))) { return this.error('Package is not installed.') };
		
		return JSON.parse(_$fs_extraφ3.readFileSync(npmFile,'utf8').toString());
	}
	
	get publisherPath(){
		
		return this.definition.publisher;
	}
	
	get publisher(){
		
		if (!this.publisherPath) {
			
			return this.error('This package is not publishable.');
		};
		
		const publisherModule = _$pathφ.join(this.package,this.publisherPath);
		
		if (!(_$fs_extraφ2.existsSync(publisherModule))) {
			
			return this.error('Publisher does not exist.');
		};
		
		let publisher = require(publisherModule).Package;
		
		publisher = new publisher;
		
		if (typeof publisher.publish !== 'function') {
			
			return this.error('Publish function missing.');
		};
		
		return publisher.publish();
	}
	
	handle(){
		var self = this;
		
		let tags = this.option('tag');
		
		if (_$Helpersφ.isString(tags)) { tags = [tags] };
		
		return tags.forEach(function(optTag) { return self.persist(optTag); });
	}
	
	/**
	@param {String} optTag
	*/
	persist(optTag){
		var self = this;
		
		if (!this.publisher[optTag] || (this.publisher[optTag] && this.publisher[optTag].paths === undefined || this.publisher[optTag].paths === null)) {
			
			return this.write(("<fg:red>" + optTag + " is missing.</fg:red>"));
		};
		
		if (typeof this.publisher[optTag] !== 'object') {
			
			return this.write(("<fg:red>" + optTag + " is missing paths.</fg:red>"));
		};
		
		return Object.keys(self.publisher[optTag].paths).forEach(function(entry) {
			
			const file = _$pathφ.join(self.package,self.publisher[optTag].paths[entry]);
			
			if (_$fs_extraφ2.existsSync(entry) && !(self.option('force',false))) {
				
				return self.write(("<fg:red>" + entry + " already exists. Skipping.</fg:red>"));
			} else {
				
				_$fs_extraφ.copySync(file,entry,{overwrite: true});
				
				return self.write(_$fs_extraφ2.existsSync(entry) ? (("<fg:green>Published " + entry + ".</fg:>")) : (("<fg:red>" + entry + " not published.</fg:red>")));
			};
		});
	}
};
exports.PackagePublishCommand = PackagePublishCommand;
