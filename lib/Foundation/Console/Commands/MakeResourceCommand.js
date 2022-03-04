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
	
	get stub(){
		
		return new $8.Stub('resource',{},'resource');
	}
	
	handle(){
		
		const reference = this.stub;
		const information = reference.make();
		
		const filePath = $4.join(process.cwd(),information.destination,reference.namespace,information.fileName);
		
		if ($3.existsSync(filePath)) {
			
			return this.error(("" + (this.resource) + " already exists."));
		};
		
		const directory = $2.dirname(filePath);
		
		if (!($3.existsSync(directory))) {
			
			$5.mkdirSync(directory,{recursive: true});
		};
		
		$7.writeFileSync($6.normalize(filePath),information.output);
		
		if ($3.existsSync(filePath)) {
			
			return this.info(("" + (this.resource) + " created successfully."));
		};
		
		return this.error(("" + (this.resource) + " not created."));
	}
};
exports.MakeResourceCommand = MakeResourceCommand;
