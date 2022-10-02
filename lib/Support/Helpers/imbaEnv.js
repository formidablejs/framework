Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
/**
@param {boolean} stringify
*/
function imbaEnv(stringify = true){
	
	const prefix = 'IMBA_APP_';
	const envList = {};
	
	for (let $3 = process.env, $1 = 0, $2 = Object.keys($3), $4 = $2.length, env, value; $1 < $4; $1++){
		env = $2[$1];value = $3[env];
		if (env.startsWith(prefix)) {
			
			envList[env.slice(prefix.length)] = value;
		};
	};
	
	return stringify ? JSON.stringify(envList) : envList;
};
exports.default = imbaEnv;
