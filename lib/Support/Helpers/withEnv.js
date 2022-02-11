function iter$__(a){ let v; return a ? ((v=a.toIterable) ? v.call(a) : a) : []; };
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
function withEnv(prefix = 'IMBA_'){
	
	const envList = {};
	
	for (let value = 0, itemsφ = iter$__(process.env), lenφ = itemsφ.length; value < lenφ; value++) {
		let env = itemsφ[value];
		if (env.startsWith(prefix)) {
			
			envList[env.slice(prefix.length)] = value;
		};
	};
	
	return envList;
};
exports.default = withEnv;
