
module.exports = class Model {
	
	constructor(config){
		
		this.config = config;
	}
	
	static get routeKeyName(){
		
		return 'id';
	}
	
	fetch(){
		
		return {};
	}
	
	fetchAll(){
		
		return [];
	}
	
	count(){
		
		return 0;
	}
};
