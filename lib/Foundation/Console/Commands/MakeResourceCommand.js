Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('../Command'/*$path$*/);
var $2 = require('path'/*$path$*/);
var $3 = require('fs'/*$path$*/);
var $4 = require('path'/*$path$*/);
var $5 = require('fs'/*$path$*/);
var $6 = require('path'/*$path$*/);
var $7 = require('fs'/*$path$*/);
var $8 = require('@formidablejs/stubs'/*$path$*/);
class MakeResourceCommand extends $1.Command {
	
	
	get resource(){
		
		return '';
	}
	
	get package(){
		
		return $4.join(process.cwd(),'package.json');
	}
	
	get language(){
		
		if ($3.existsSync(this.package)) {
			
			return require(this.package).language || 'imba';
		} else {
			
			return 'imba';
		};
	}
	
	get stub(){
		
		return new $8.Stub('resource',{},'resource',this.language.toLowerCase());
	}
	
	handle(){
		
		const reference = this.stub;
		const information = reference.make();
		
		const filePath = $4.join(process.cwd(),information.destination,reference.namespace,information.fileName);
		
		if ($3.existsSync(filePath)) {
			
			this.message('error',("" + (this.resource) + " already exists."));
			
			this.exit();
			
			return;
		};
		
		const directory = $2.dirname(filePath);
		
		if (!($3.existsSync(directory))) {
			
			$5.mkdirSync(directory,{recursive: true});
		};
		
		$7.writeFileSync($6.normalize(filePath),information.output);
		
		if ($3.existsSync(filePath)) {
			
			this.message('info',("" + (this.resource) + " created successfully."));
			
			this.exit();
			
			return;
		};
		
		this.message('error',("" + (this.resource) + " not created."));
		
		return this.exit();
	}
};
exports.MakeResourceCommand = MakeResourceCommand;
