Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
/**
@param {Boolean} stringify
*/
function imbaEnv(stringify = true){
	
	const prefix = 'IMBA_APP_';
	const envList = {};
	
	for (let oφ = process.env, iφ = 0, keysφ = Object.keys(oφ), lφ = keysφ.length, env, value; iφ < lφ; iφ++){
		env = keysφ[iφ];value = oφ[env];
		if (env.startsWith(prefix)) {
			
			envList[env.slice(prefix.length)] = value;
		};
	};
	
	return stringify ? JSON.stringify(envList) : envList;
};
exports.default = imbaEnv;
