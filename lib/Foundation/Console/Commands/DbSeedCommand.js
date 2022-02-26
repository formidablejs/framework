Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$Helpersφ = require('../../../Support/Helpers'/*$path$*/);
var _$Commandφ = require('../Command'/*$path$*/);

class DbSeedCommand extends _$Commandφ.Command {
	
	
	get signature(){
		
		return 'db:seed';
	}
	
	get description(){
		
		return 'Seed the database with records';
	}
	
	async handle(){
		var self = this;
		
		await this.shouldRun();
		
		this.usingEnv();
		
		const results = await this.app.seeder().run();
		
		if (results === false) { return this.error('Seeding failed') };
		
		if (_$Helpersφ.isArray(results)) {
			
			results[0].forEach(function(seeder) { return self.info(("Seeded: " + seeder)); });
			
			return;
		};
		
		return console.error(results);
	}
};
exports.DbSeedCommand = DbSeedCommand;
