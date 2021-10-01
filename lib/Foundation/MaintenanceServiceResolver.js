function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/

var _$indexφ = require('../Support/Helpers/index'/*$path$*/);
var _$fsφ = requireDefault$__(require('fs'/*$path$*/));
var _$MaintenanceModeExceptionφ = requireDefault$__(require('./Exceptions/MaintenanceModeException'/*$path$*/));
var _$pathφ = requireDefault$__(require('path'/*$path$*/));
var _$ServiceResolverφ = requireDefault$__(require('../Support/ServiceResolver'/*$path$*/));

class MaintenanceServiceResolver extends _$ServiceResolverφ.default {
	
	
	boot(){
		
		this.app.addHook('onRequest',function(request,reply,done) {
			
			const maintenanceFile = _$pathφ.default.join(process.cwd(),'storage','framework','down.json');
			
			const isDown = _$fsφ.default.existsSync(maintenanceFile);
			
			if (isDown) {
				
				let down = {
					message: 'Service Unavailable',
					statusCode: 503
				};
				
				try {
					/**@type {Object}*/ /**@type {Object}*/(down) = JSON.parse(_$fsφ.default.readFileSync(maintenanceFile,'utf8'));
				} catch (e) { };
				
				const message = (!(_$indexφ.isEmpty(down)) && !(_$indexφ.isEmpty(down.message))) ? down.message : 'Service Unavailable';
				const statusCode = (!(_$indexφ.isEmpty(down)) && !(_$indexφ.isEmpty(down.statusCode))) ? down.statusCode : 503;
				
				throw new _$MaintenanceModeExceptionφ.default(message,statusCode);
			};
			
			return done();
		});
		
		return this;
	}
};
exports.default = MaintenanceServiceResolver;
