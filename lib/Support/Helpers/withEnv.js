Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
function withEnv(){
	
	const prefix = 'IMBA_APP_';
	const envList = {};
	
	for (let oφ = process.env, iφ = 0, keysφ = Object.keys(oφ), lφ = keysφ.length, env, value; iφ < lφ; iφ++){
		env = keysφ[iφ];value = oφ[env];
		if (env.startsWith(prefix)) {
			
			envList[env.slice(prefix.length)] = value;
		};
	};
	
	return envList;
};
exports.default = withEnv;
