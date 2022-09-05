Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('../../../Support/Helpers'/*$path$*/);
var $2 = require('../Command'/*$path$*/);

class DbSeedCommand extends $2.Command {
	
	
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
		
		if (results === false) { return this.message('error','Seeding failed') };
		
		if ($1.isArray(results)) {
			
			results[0].forEach(function(seeder) { return self.write(("<fg:green>Seeded:</fg:green> " + seeder)); });
			
			this.exit();
		};
		
		console.error(results);
		
		return this.exit();
	}
};
exports.DbSeedCommand = DbSeedCommand;
