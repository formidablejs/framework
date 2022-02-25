Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$consoleφ = require('@formidablejs/console'/*$path$*/);
var _$pathφ = require('path'/*$path$*/);
var _$fsφ = require('fs'/*$path$*/);
var _$pathφ2 = require('path'/*$path$*/);
var _$fsφ2 = require('fs'/*$path$*/);
var _$pathφ3 = require('path'/*$path$*/);
var _$fsφ3 = require('fs'/*$path$*/);
var _$stubsφ = require('@formidablejs/stubs'/*$path$*/);
class MakeResourceCommand extends _$consoleφ.Command {
	
	
	get resource(){
		
		return '';
	}
	
	get stub(){
		
		return new _$stubsφ.Stub('resource',{},'resource');
	}
	
	handle(){
		
		const reference = this.stub;
		const information = reference.make();
		
		const filePath = _$pathφ2.join(process.cwd(),information.destination,reference.namespace,information.fileName);
		
		if (_$fsφ.existsSync(filePath)) {
			
			return this.error(("" + (this.resource) + " already exists."));
		};
		
		const directory = _$pathφ.dirname(filePath);
		
		if (!(_$fsφ.existsSync(directory))) {
			
			_$fsφ2.mkdirSync(directory,{recursive: true});
		};
		
		_$fsφ3.writeFileSync(_$pathφ3.normalize(filePath),information.output);
		
		if (_$fsφ.existsSync(filePath)) {
			
			return this.write(("<fg:green>" + (this.resource) + " created successfully.</fg:green>"));
		};
		
		return this.error(("" + (this.resource) + " not created."));
	}
};
exports.MakeResourceCommand = MakeResourceCommand;
