Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('../Command'/*$path$*/);
var $2 = require('fs-extra'/*$path$*/);
var $3 = require('fs-extra'/*$path$*/);
var $4 = require('../../../Support/Helpers'/*$path$*/);
var $5 = require('path'/*$path$*/);
var $6 = require('@formidablejs/console'/*$path$*/);
var $7 = require('fs-extra'/*$path$*/);

class PackagePublishCommand extends $1.Command {
	
	
	get signature(){
		
		return 'package:publish {--package} {--tag} {?--force}';
	}
	
	get description(){
		
		return 'Install Formidable package';
	}
	
	get props(){
		
		return {
			package: $6.Prop.string().description('Package name'),
			tag: $6.Prop.string().description('Assets you want to publish'),
			force: $6.Prop.boolean().default(false).description('Overwrite any existing files')
		};
	}
	
	get package(){
		
		return $5.join(process.cwd(),'node_modules',this.option('package'));
	}
	
	get definition(){
		
		const npmFile = $5.join(this.package,'package.json');
		
		if (!($3.existsSync(npmFile))) { return this.error('Package is not installed.') };
		
		return JSON.parse($7.readFileSync(npmFile,'utf8').toString());
	}
	
	get publisherPath(){
		
		return this.definition.publisher;
	}
	
	get publisher(){
		
		if (!this.publisherPath) {
			
			return this.error('This package is not publishable.');
		};
		
		const publisherModule = $5.join(this.package,this.publisherPath);
		
		if (!($3.existsSync(publisherModule))) {
			
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
		
		let tags = this.option('tag').split(',');
		
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
			
			const file = $5.join(self.package,self.publisher[optTag].paths[entry]);
			
			if ($3.existsSync(entry) && !(self.option('force',false))) {
				
				return self.write(("<fg:red>" + entry + " already exists. Skipping.</fg:red>"));
			} else {
				
				$2.copySync(file,entry,{overwrite: true});
				
				return self.write($3.existsSync(entry) ? (("<fg:green>Published " + entry + ".</fg:>")) : (("<fg:red>" + entry + " not published.</fg:red>")));
			};
		});
	}
};
exports.PackagePublishCommand = PackagePublishCommand;
