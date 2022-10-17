Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('../Command'/*$path$*/);
var $2 = require('../../Inspiring'/*$path$*/);

class InspireCommand extends $1.Command {
	
	
	get signature(){
		
		return 'inspire';
	}
	
	get description(){
		
		return 'Display an inspiring quote';
	}
	
	handle(){
		
		this.write($2.Inspiring.formatForConsole($2.Inspiring.quote));
		
		return this.exit();
	}
};
exports.InspireCommand = InspireCommand;
