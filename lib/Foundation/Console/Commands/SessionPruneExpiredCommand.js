function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = requireDefault$__(require('../../../Database/Database'/*$path$*/));
var $2 = require('../Command'/*$path$*/);

class SessionPruneExpiredCommand extends $2.Command {
	
	
	get signature(){
		
		return 'session:prune-expired';
	}
	
	get description(){
		
		return 'Prune expired sessions.';
	}
	
	async handle(){
		
		const total = await $1.default.table('personal_access_tokens').where('name','auth:session').where('ttl','<',(new Date()).valueOf()).delete();
		
		
		if (!(isNaN(total))) {
			
			this.message('info','Successfully pruned expired sessions');
			
			return this.exit();
		};
		
		this.message('error','An error occured while trying to prune expired sessions');
		
		return this.exit();
	}
};
exports.SessionPruneExpiredCommand = SessionPruneExpiredCommand;
